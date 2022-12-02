const { createError, errorCauses } = require('error-causes');
const { getUserIsSignedIn, setUser, setAnonUser } = require('./reducer');
const {
  getProfile,
  updateLastSignedIn,
} = require('../../services/greenruhm-api/index.js');

/**
 * For context around Auth related errors reference:
 * https://magic.link/docs/auth/api-reference/client-side-sdks/web#errors-warnings
 */
const [signInErrors, handleSignInErrors] = errorCauses({
  AccountNotFound: {
    code: 404,
    message: 'An account was not found. Please sign up.',
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
  AuthUserRejectedConsentToShareEmail: {
    code: -99999,
    message:
      'To sign in with Greenruhm you must consent to sharing your email.',
  },
  EmailIsRequired: {
    code: 400,
    message: 'An email is required. Please provide a valid email.',
  },
  InternalServerError: {
    code: 500,
    message: 'There was an unexpected error. Please try again.',
  },
});

const handleMagicSignInError = (error) => {
  const actions = {
    [signInErrors.AuthInternalError.code]: () => {
      throw createError(signInErrors.AuthInternalError);
    },
    [signInErrors.AuthInvalidEmail.code]: () => {
      throw createError(signInErrors.AuthInvalidEmail);
    },
    [signInErrors.AuthLinkExpired.code]: () => {
      throw createError(signInErrors.AuthLinkExpired);
    },
    [signInErrors.AuthUserRequestEditEmail.code]: () => {
      throw createError(signInErrors.AuthUserRequestEditEmail);
    },
  };

  if (typeof actions[error.code] !== 'function') {
    throw new Error('Invalid Magic error action!');
  }

  return actions[error.code]();
};

const withSignInErrors = (params) => {
  return {
    ...params,
    handleMagicSignInError,
    signInErrors,
  };
};

const signInThroughMagicConnect = async ({
  dispatch,
  magic,
  web3Provider,
  signInErrors,
  handleMagicSignInError,
}) => {
  const walletAddress = await web3Provider
    .listAccounts()
    .then((accounts) => accounts[0])
    .catch(handleMagicSignInError);

  const { email } = await magic.connect.requestUserInfo().catch((error) => {
    magic.connect.disconnect();

    if (error.rawMessage === 'User rejected the action') {
      throw createError(signInErrors.AuthUserRejectedConsentToShareEmail);
    } else {
      handleMagicSignInError(error);
    }
  });

  if (!email || !walletAddress) {
    dispatch(setAnonUser());
    magic.connect.disconnect();
    return;
  }

  // Get user info from Greenruhm
  const profileData = await getProfile({ walletAddress, signInErrors });

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
  email,
  dispatch,
  getState,
  magic,
  signInErrors,
  handleMagicSignInError,
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
    const profileData = await getProfile({ walletAddress, signInErrors });

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

module.exports.signIn = signInUser;
module.exports.signInThroughMagicConnect = signInThroughMagicConnect;
module.exports.signInErrors = signInErrors;
module.exports.handleSignInErrors = handleSignInErrors;
module.exports.withSignInErrors = withSignInErrors;
