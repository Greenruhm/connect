import { createError, errorCauses } from 'error-causes';
import { setUser, setAnonUser } from './reducer';
import { createUser as createGreenruhmUser } from '../../services/greenruhm-api/index.js';
import { getUserIsSignedIn } from './reducer';

// https://magic.link/docs/auth/api-reference/client-side-sdks/web#errors-warnings
const [signUpErrors, handleSignUpErrors] = errorCauses({
  AuthLinkExpired: {
    code: -10001,
    message: 'Auth link expired.',
  },
  AccountAlreadyExists: {
    code: 4003,
    message: 'An account already exists for this email.',
  },
  EmailIsRequired: {
    code: 400,
    message: 'Email is required.',
  },
  InvalidEmailWithMagic: {
    code: -32602,
    message: 'Invalid email.',
  },
  InvalidUsername: {
    code: 4001,
    message: 'Invalid username.',
  },
  InternalError: {
    code: -32603,
    message: 'Internal error.',
  },
  UsernameIsUnavailable: {
    code: 4002,
    message: 'Username unavailable.',
  },
  UsernameIsRequired: {
    code: 4000,
    message: 'Username is required.',
  },
  UserRequestEditEmail: {
    code: -10005,
    message: 'User request edit email.',
  },
  /**
   * TODO: Remove after adapting Magic connect sign in flow
   * to have user enter their email manually
   * (i.e. after removal of magic.connect.requestUserInfo() from implementation)
   */
  UserRejectedConsentToShareEmail: {
    code: -99999,
    message:
      'To sign up with Greenruhm you must consent to sharing your email.',
  },
});

export { signUpErrors, handleSignUpErrors };

const handleMagicSignUpError = (error) => {
  switch (error.code) {
    case signUpErrors.AuthLinkExpired.code:
      throw createError(signUpErrors.AuthLinkExpired);
    case signUpErrors.InvalidEmailWithMagic.code:
      throw createError(signUpErrors.InvalidEmailWithMagic);
    case signUpErrors.InternalError.code:
      throw createError(signUpErrors.InternalError);
    case signUpErrors.UserRequestEditEmail.code:
      throw createError(signUpErrors.UserRequestEditEmail);
  }
};

const handleCreateGreenruhmUserError = (error) => {
  switch (error.message) {
    case signUpErrors.AccountAlreadyExists.message:
      throw createError(signUpErrors.AccountAlreadyExists);
    case signUpErrors.InvalidUsername.message:
      throw createError(signUpErrors.InvalidUsername);
    case signUpErrors.UsernameIsUnavailable.message:
      throw createError(signUpErrors.UsernameIsUnavailable);
  }
};

export const withSignUpErrors = (params) => {
  return {
    ...params,
    handleCreateGreenruhmUserError,
    handleMagicSignUpError,
    signUpErrors,
  };
};

export const signUpThroughMagicConnect = async ({
  dispatch,
  displayName,
  handleCreateGreenruhmUserError,
  handleMagicSignUpError,
  magic,
  username,
  signUpErrors,
  web3Provider,
} = {}) => {
  if (!username) {
    throw createError(signUpErrors.UsernameIsRequired);
  }

  // TODO: Remove
  console.log({ username });
  console.log({ magic });
  console.log({ web3Provider });

  const signer = web3Provider.getSigner();
  console.log({ signer });

  const walletAddress = await web3Provider
    .listAccounts()
    .then((accounts) => accounts[0])
    .catch(handleMagicSignUpError);

  console.log({ walletAddress });

  const { email } = await magic.connect.requestUserInfo().catch((error) => {
    magic.connect.disconnect();

    /**
     * TODO: Remove after adapting Magic connect sign up flow
     * to have user enter their email manually
     * (i.e. after removal of magic.connect.requestUserInfo() from implementation)
     *
     * Magic uses the same error code -32603 when the user rejects consent
     * to share their email as when their is an internal error so
     * a check against the error message is required to differentiate
     * the error cause we create here.
     */
    if (error.rawMessage === 'User rejected the action') {
      throw createError(signUpErrors.UserRejectedConsentToShareEmail);
    } else {
      handleMagicSignUpError(error);
    }
  });
  console.log({ email });

  if (!email || !walletAddress) {
    dispatch(setAnonUser());
    magic.connect.disconnect();
    return;
  }

  /*
    Try to call createGreenruhmUser - it will throw if:
      - username already exists
      - email already exists
      - weird, unexpected error
    */
  return createGreenruhmUser({
    walletAddress,
    email,
    displayName,
    username,
  })
    .then(({ _id: id, ...user }) => {
      const userData = {
        ...user,
        id,
        walletAddress,
        email,
        isSignedIn: true,
        // sessionToken,
      };
      dispatch(setUser(userData));
      return userData;
    })
    .catch(async (e) => {
      magic.connect.disconnect();
      dispatch(setAnonUser());
      handleCreateGreenruhmUserError(e);
    });
};

const signUp = async ({
  dispatch,
  displayName = username,
  email,
  getState,
  handleCreateGreenruhmUserError,
  handleMagicSignUpError,
  magic,
  signUpEmail = email,
  signUpErrors,
  username,
} = {}) => {
  if (!email) {
    throw createError(signUpErrors.EmailIsRequired);
  }
  if (!username) {
    throw createError(signUpErrors.UsernameIsRequired);
  }

  const createUser = async (magicUser) => {
    if (!magicUser && getUserIsSignedIn(getState())) {
      // we don't have a magic user, but our state says we are logged in.
      // let's reset the user in state with the anonymous user.
      console.log(
        "Magic user was not found, but store state says we're logged in. Resetting user."
      );
      dispatch(setAnonUser());
      return;
    }

    // Gather the user info from magic.
    const magicUserData = await Promise.all([
      magicUser.getMetadata(),
      magicUser.getIdToken(),
    ]).catch(() => {
      // If we can't get the user data, we can't create a user.
      // This is probably because the user is not logged in.
      // We'll reset the user in state to the anonymous user.
      dispatch(setAnonUser());
    });

    if (!magicUserData) return;

    const { publicAddress: walletAddress, email } = magicUserData[0];
    const sessionToken = magicUserData[1];

    if (signUpEmail !== email) {
      console.log(
        'Logged in user email mismatch, signing up with email:',
        signUpEmail
      );
      await magicUser.logout();
      dispatch(setAnonUser());

      // Wait a tick for the user to be logged out.
      await Promise.resolve();
      return signUp({
        email: signUpEmail,
        username,
        displayName,
        dispatch,
        getState,
        magic,
      });
    }

    /*
    Try to call createGreenruhmUser - it will throw if:
     - username already exists
     - email already exists
     - weird, unexpected error
    */
    return createGreenruhmUser({
      walletAddress,
      email,
      displayName,
      username,
    })
      .then(({ _id: id, ...user }) => {
        const userData = {
          ...user,
          id,
          walletAddress,
          email,
          isSignedIn: true,
          sessionToken,
        };
        dispatch(setUser(userData));
        return userData;
      })
      .catch(async (e) => {
        await magicUser.logout();
        dispatch(setAnonUser());
        handleCreateGreenruhmUserError(e);
      });
  };

  // We check to see if the user is
  // already signed in to the Magic API.
  if (await magic.user.isLoggedIn()) {
    console.log('Magic user is logged in.');
    return createUser(magic.user);
  }

  // User isn't signed in - so lets send them a email link.
  console.log('Magic user is not logged in. Logging in with Magic...');

  await magic.auth.loginWithMagicLink({ email }).catch(handleMagicSignUpError);

  // And update the user in our state.
  return createUser(magic.user);
};

export default signUp;
