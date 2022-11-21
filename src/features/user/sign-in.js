import { errorCauses } from 'error-causes';
import { setUser, setAnonUser } from './reducer';
import {
  getProfile,
  updateLastSignedIn,
} from '../../services/greenruhm-api/index.js';
import { getUserIsSignedIn } from './reducer';

const [signInErrors, handleSignInErrors] = errorCauses({
  AccountNotFound: {
    code: 404,
    message: 'An account was not found. Please sign up.',
  },
  EmailIsRequired: {
    code: 400,
    message: 'An email is required. Please provide a valid email.',
  },
  InternalServerError: {
    code: 500,
    message: 'There was an internal server error. Please try again.',
  },
});

export { signInErrors, handleSignInErrors };

export const signInThroughMagicConnect = async ({
  dispatch,
  handleMagicError,
  magic,
  web3Provider,
}) => {
  const walletAddress = await web3Provider
    .listAccounts()
    .then((accounts) => accounts[0])
    .catch(handleMagicError);

  console.log({ walletAddress });

  const { email } = await magic.connect.requestUserInfo().catch((error) => {
    magic.connect.disconnect();

    if (error.rawMessage === 'User rejected the action') {
      throw new Error(
        'To sign up with Greenruhm you must consent to sharing your email.'
      );
    } else {
      handleMagicError(error);
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
    throw new Error('Account not found.');
  }

  // Update users last signed in date in Greenruhm.
  updateLastSignedIn(id);

  const userData = {
    ...user,
    id,
    walletAddress,
    email,
    // isSignedIn: true,
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
  handleMagicError,
} = {}) => {
  if (!email) {
    throw new Error('Email Required to Sign In User');
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

    if (!id) throw new Error('Account not found.');

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
  await magic.auth.loginWithMagicLink({ email }).catch(handleMagicError);

  // And update the user in our state.
  return updateUser(magic.user);
};

export default signInUser;
