import { setUser, setAnonUser } from './reducer';
import {
  getProfile,
  createUser as createGreenruhmUser
} from '../../services/greenruhm-api/index.js';
import { getUserIsSignedIn } from './reducer';

const signUp = async ({
  email,
  username,
  displayName = username,
  dispatch,
  getState,
  magic,
  signUpEmail = email
} = {}) => {
  if (!email) {
    throw new Error('Email is required.');
  }
  if (!username) {
    throw new Error('Username is required.');
  }

  const createUser = async magicUser => {
    if (!magicUser && getUserIsSignedIn(getState())) {
      // we don't have a magic user, but our state says we are logged in.
      // lets reset the user in state with the anonymous user.
      console.log(
        "Magic user was not found, but store state says we're logged in. Resetting user."
      );
      setAnonUser();
      return;
    }

    // Gather the user info from magic.
    const magicUserData = await Promise.all([
      magicUser.getMetadata(),
      magicUser.getIdToken()
    ]);

    const { publicAddress: walletAddress, email } = magicUserData[0];
    const sessionToken = magicUserData[1];

    if (signUpEmail !== email) {
      console.log(
        'Logged in user email mismatch, signing up with email:',
        signUpEmail
      );
      await magicUser.logout();
      dispatch(setAnonUser());

      // wait a tick for the user to be logged out.
      await Promise.resolve();
      signUp({
        email: signUpEmail,
        username,
        displayName,
        dispatch,
        getState,
        magic
      });
      return;
    }

    // Get user from Greenruhm
    console.log(
      `Fetching user data from Greenruhm API by walletAddress: ${walletAddress}`
    );
    const profileData = await getProfile(walletAddress);

    const id = profileData[walletAddress]?._id;

    if (id) {
      // The wallet address is already registered with Greenruhm.
      // Lets clear our state and log the user out of magic.
      // We will ask the user to use the sign in method.
      console.log(
        'The wallet address already has a Greenruhm account. Clear state and log user out. Ask user to use the signIn() method.'
      );
      await magicUser.logout();
      dispatch(setAnonUser());
      throw new Error('User Already Exists. Please Use Sign In Method.');
    } else {
      // The user doesn't exist in Greenruhm. Lets create them and sign them in.
      console.log(
        "The user doesn't exist in Greenruhm. Create and sign them in!"
      );
      const { _id: id, ...user } = await createGreenruhmUser({
        walletAddress,
        email,
        displayName,
        username
      });
      const userData = {
        ...user,
        id,
        walletAddress,
        email,
        isSignedIn: true,
        sessionToken
      };
      dispatch(setUser(userData));
      return userData;
    }
  };

  // We check to see if the user is
  // already signed in to the Magic API.
  if (await magic.user.isLoggedIn()) {
    console.log('Magic user is logged in.');
    return createUser(magic.user);
  }

  // user isn't signed in - so lets send them a email link.
  console.log('Magic user is not logged in. Logging in with Magic...');
  await magic.auth.loginWithMagicLink({ email });

  // And update the user in our state.
  return createUser(magic.user);
};

export default signUp;
