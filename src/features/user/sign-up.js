import { setUser, setAnonUser } from './reducer';
import { createUser as createGreenruhmUser } from '../../services/greenruhm-api/index.js';
import { getUserIsSignedIn } from './reducer';

export const signUpThroughMagicConnect = async ({
  dispatch,
  displayName,
  handleMagicError,
  magic,
  username,
  web3Provider,
} = {}) => {
  if (!username) {
    throw new Error('Username is required.');
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
    .catch((error) => {
      // TODO: Remove console log
      console.log({ signInError: error });
      handleMagicError(error);
    });

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
      throw e;
    });
};

const signUp = async ({
  dispatch,
  displayName = username,
  email,
  getState,
  handleMagicError,
  magic,
  signUpEmail = email,
  username,
} = {}) => {
  if (!email) {
    throw new Error('Email is required.');
  }
  if (!username) {
    throw new Error('Username is required.');
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

  await magic.auth.loginWithMagicLink({ email }).catch(handleMagicError);

  // And update the user in our state.
  return createUser(magic.user);
};

export default signUp;
