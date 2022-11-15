import { createError, errorCauses } from 'error-causes';
import { setUser, setAnonUser } from './reducer';
import {
  getProfile,
  updateLastSignedIn,
} from '../../services/greenruhm-api/index.js';
import { getUserIsSignedIn } from './reducer';

// https://magic.link/docs/auth/api-reference/client-side-sdks/web#errors-warnings
const [signInErrors, handleSignInErrors] = errorCauses({
  AuthLinkExpired: {
    code: -10001,
    message: 'Auth link expired.',
  },
  AccountNotFound: {
    code: 404,
    message: 'Account not found.',
  },
  EmailIsRequired: {
    code: 400,
    message: 'Email required to sign in user.',
  },
  InvalidEmail: {
    code: -32602,
    message: 'Invalid email.',
  },
  InternalError: {
    code: -32603,
    message: 'Internal error.',
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
      'To sign in with Greenruhm you must consent to sharing your email.',
  },
});

export { signInErrors, handleSignInErrors };

const handleMagicSignInError = (error) => {
  switch (error.code) {
    case signInErrors.AuthLinkExpired.code:
      throw createError(signInErrors.AuthLinkExpired);
    case signInErrors.InvalidEmail.code:
      throw createError(signInErrors.InvalidEmail);
    case signInErrors.InternalError.code:
      throw createError(signInErrors.InternalError);
    case signInErrors.UserRequestEditEmail.code:
      throw createError(signInErrors.UserRequestEditEmail);
  }
};

export const withSignInErrors = (params) => {
  return {
    ...params,
    handleMagicSignInError,
    signInErrors,
  };
};

export const signInThroughMagicConnect = async ({
  dispatch,
  handleMagicSignInError,
  magic,
  signInErrors,
  web3Provider,
}) => {
  const walletAddress = await web3Provider
    .listAccounts()
    .then((accounts) => accounts[0])
    .catch(handleMagicSignInError);

  console.log({ walletAddress });

  const { email } = await magic.connect.requestUserInfo().catch((error) => {
    magic.connect.disconnect();

    /**
     * TODO: Remove after adapting Magic connect sign in flow
     * to have user enter their email manually
     * (i.e. after removal of magic.connect.requestUserInfo() from implementation)
     *
     * Magic uses the same error code -32603 when the user rejects consent
     * to share their email as when their is an internal error so
     * a check against the error message is required to differentiate
     * the error cause we create here.
     */
    if (error.rawMessage === 'User rejected the action') {
      throw createError(signInErrors.UserRejectedConsentToShareEmail);
    } else {
      handleMagicSignInError(error);
    }
  });
  console.log({ email });

  if (!email || !walletAddress) {
    dispatch(setAnonUser());
    magic.connect.disconnect();
    return;
  }

  // Get user info from Greenruhm
  const profileData = await getProfile(walletAddress);

  const {
    _id: id,
    // filter out avatarImg
    // eslint-disable-next-line no-unused-vars
    avatarImg,
    ...user
  } = profileData[walletAddress];

  if (!id) {
    magic.connect.disconnect();
    throw createError(signInErrors.AccountNotFound);
  }

  // Update users last signed in date in Greenruhm.
  updateLastSignedIn(id);

  const userData = {
    ...user,
    id,
    walletAddress,
    email,
    isSignedIn: true,
    // sessionToken,
  };

  // They're signed in, so we need to
  // make sure that's reflected in our
  // state.
  dispatch(setUser(userData));
  return userData;
};

const signInUser = async ({
  dispatch,
  email,
  getState,
  handleMagicSignInError,
  magic,
  signInErrors,
} = {}) => {
  if (!email) {
    throw createError(signInErrors.EmailIsRequired);
  }

  const updateUser = async (magicUser) => {
    if (!magicUser && getUserIsSignedIn(getState())) {
      // we don't have a magic user, but our state says we are logged in.
      // lets reset the user in state with the anonymous user.
      setAnonUser();
      return;
    }
    // Gather the user info from magic.
    const magicUserData = await Promise.all([
      magicUser.getMetadata(),
      magicUser.getIdToken(),
    ]);

    const { publicAddress: walletAddress, email } = magicUserData[0];
    const sessionToken = magicUserData[1];

    // Get user info from Greenruhm
    const profileData = await getProfile(walletAddress);

    const {
      _id: id,
      // filter out avatarImg
      // eslint-disable-next-line no-unused-vars
      avatarImg,
      ...user
    } = profileData[walletAddress];

    if (!id) throw createError(signInErrors.AccountNotFound);

    // Update users last signed in date in Greenruhm.
    updateLastSignedIn(id);

    const userData = {
      ...user,
      id,
      walletAddress,
      email,
      isSignedIn: true,
      sessionToken,
    };

    // They're signed in, so we need to
    // make sure that's reflected in our
    // state.
    dispatch(setUser(userData));
    return userData;
  };

  // We check to see if the user is
  // already signed in to the Magic API.
  if (await magic.user.isLoggedIn()) {
    return updateUser(magic.user);
  }

  // user isn't signed in - so lets send them a email link.
  await magic.auth.loginWithMagicLink({ email }).catch(handleMagicSignInError);

  // And update the user in our state.
  return updateUser(magic.user);
};

export default signInUser;
