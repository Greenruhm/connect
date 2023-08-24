const { createError } = require('error-causes');
const { setUser, setAnonUser } = require('./reducer');
const {
  createUser: createGreenruhmUser,
} = require('../../services/greenruhm-api/index.js');
const { signUpErrors } = require('./sign-up-error-causes');
const { configureMagicErrorCauses } = require('./with-magic');

const isServer = typeof window === 'undefined';

const handleMagicSignUpError = configureMagicErrorCauses(signUpErrors);

const signUpThroughMagicConnect = async ({
  dispatch,
  displayName,
  magic,
  username,
  web3Provider,
} = {}) => {
  if (!username) {
    throw createError(signUpErrors.UsernameIsRequired);
  }

  const signer = web3Provider.getSigner();
  console.log({ signer });

  const walletAddress = await web3Provider
    .listAccounts()
    .then((accounts) => accounts[0])
    .catch(handleMagicSignUpError);

  const { email } = await magic.connect.requestUserInfo().catch((error) => {
    magic.connect.disconnect();

    if (error.rawMessage === 'User rejected the action') {
      throw createError(signUpErrors.AuthUserRejectedConsentToShareEmail);
    } else {
      handleMagicSignUpError(error);
    }
  });

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
      !isServer && localStorage.setItem('userData', JSON.stringify(userData));
      return userData;
    })
    .catch(async (e) => {
      magic.connect.disconnect();
      dispatch(setAnonUser());
      throw e;
    });
};

module.exports.signUpThroughMagicConnect = signUpThroughMagicConnect;
