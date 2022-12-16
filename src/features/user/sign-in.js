const { createError } = require('error-causes');
const { getUserIsSignedIn, setUser, setAnonUser } = require('./reducer');
const {
  getProfile,
  updateLastSignedIn,
} = require('../../services/greenruhm-api/index.js');
const { signInErrors } = require('./sign-in-error-causes');
const { configureMagicErrorCauses } = require('./with-magic');

const handleMagicSignInError = configureMagicErrorCauses(signInErrors);

const signInThroughMagicConnect = async ({ dispatch, magic, web3Provider }) => {
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
  const profileData = await getProfile({ walletAddress });

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

const signInUser = async ({ email, dispatch, getState, magic } = {}) => {
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
    const profileData = await getProfile({ walletAddress });

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
