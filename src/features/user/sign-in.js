const { createError } = require('error-causes');
const { setUser, setAnonUser } = require('./reducer');
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

module.exports.signInThroughMagicConnect = signInThroughMagicConnect;
