const { createError, errorCauses } = require('error-causes');
const { getUserIsSignedIn, setUser, setAnonUser } = require('./reducer');
const {
  createUser: createGreenruhmUser,
} = require('../../services/greenruhm-api/index.js');

/**
 * For context around Auth related errors reference:
 * https://magic.link/docs/auth/api-reference/client-side-sdks/web#errors-warnings
 */
const [signUpErrors, handleSignUpErrors] = errorCauses({
  AccountAlreadyExists: {
    code: 400,
    message:
      "You tried to sign up with an email that already has an account. Please sign in instead, or provide a different email if you'd like to create a different account.",
  },
  AuthInternalError: {
    code: -32603,
    message:
      'There was an unexpected error with auth service. Please try again.',
  },
  AuthInvalidEmail: {
    code: -32602,
    message:
      'An invalid email was provided to auth service. Please provide a valid email.',
  },
  AuthLinkExpired: {
    code: -10001,
    message: 'The auth link expired. Please try again.',
  },
  AuthUserRequestEditEmail: {
    code: -10005,
    message: 'Error with user request to edit auth email. Please try again.',
  },
  /**
   * TODO: Remove after adapting Magic connect sign up flow
   * to have user enter their email manually
   * (i.e. after removal of magic.connect.requestUserInfo() from implementation)
   */
  AuthUserRejectedConsentToShareEmail: {
    code: -99999,
    message:
      'To sign up with Greenruhm you must consent to sharing your email.',
  },
  EmailIsRequired: {
    code: 400,
    message: 'An email is required. Please provide a valid email.',
  },
  InternalServerError: {
    code: 500,
    message: 'There was an unexpected error. Please try again.',
  },
  InvalidEmail: {
    code: 400,
    message: 'An invalid email was provided. Please provide a valid email.',
  },
  InvalidUserName: {
    code: 400,
    message:
      'An invalid username was provided. Please provide a valid username.',
  },
  UsernameIsUnavailable: {
    code: 400,
    message:
      'The requested username is unavailable. Please try a different username.',
  },
  UsernameIsRequired: {
    code: 400,
    message: 'A username is required. Please provide a valid username.',
  },
});

const handleMagicSignUpError = (error) => {
  const actions = {
    [signUpErrors.AuthInternalError.code]: () => {
      throw createError(signUpErrors.AuthInternalError);
    },
    [signUpErrors.AuthInvalidEmail.code]: () => {
      throw createError(signUpErrors.AuthInvalidEmail);
    },
    [signUpErrors.AuthLinkExpired.code]: () => {
      throw createError(signUpErrors.AuthLinkExpired);
    },
    [signUpErrors.AuthUserRequestEditEmail.code]: () => {
      throw createError(signUpErrors.AuthUserRequestEditEmail);
    },
  };

  if (typeof actions[error.code] !== 'function') {
    throw new Error('Invalid Magic error action!');
  }

  return actions[error.code]();
};

const withSignUpErrors = (params) => {
  return {
    ...params,
    handleMagicSignUpError,
    signUpErrors,
  };
};

const signUpThroughMagicConnect = async ({
  dispatch,
  displayName,
  magic,
  username,
  web3Provider,
  signUpErrors,
  handleMagicSignUpError,
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
      throw createError(signUpErrors.AuthUserRejectedConsentToShareEmail);
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
    signUpErrors,
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
      throw e;
    });
};

const signUp = async ({
  dispatch,
  displayName = username,
  email,
  getState,
  magic,
  signUpEmail = email,
  username,
  signUpErrors,
  handleMagicSignUpError,
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
      signUpErrors,
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
        throw e;
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

module.exports.signUp = signUp;
module.exports.signUpThroughMagicConnect = signUpThroughMagicConnect;
module.exports.signUpErrors = signUpErrors;
module.exports.handleSignUpErrors = handleSignUpErrors;
module.exports.withSignUpErrors = withSignUpErrors;
