const { signInThroughMagicConnect } = require('./features/user/sign-in');
const {
  signInErrors,
  handleSignInErrors,
} = require('./features/user/sign-in-error-causes');
const { signUpThroughMagicConnect } = require('./features/user/sign-up');
const {
  signUpErrors,
  handleSignUpErrors,
} = require('./features/user/sign-up-error-causes');
const { addMedia } = require('./features/drop/create');
const { createDrop } = require('./features/drop/add-media');
const { signOutThroughMagicConnect } = require('./features/user/sign-out');
const { withMagicConnect } = require('./features/user/with-magic');
const { asyncPipe, withStore } = require('./utils');
const { updateApiKeyAction } = require('./features/api-key/reducer');
const createStore = require('./reducer/store');
const signInStatusChanged = require('./features/user/sign-in-status-changed');
const { setAnonUser, getUser } = require('./features/user/reducer');

let initializedConnectInstance;

const defaultOnChangedSignIn = () => {
  console.log(
    'The signed-in status of the user has changed. To handle this change, consider passing a function to the connect creator as `onChangedSignIn`. This function will be called whenever the signed-in status updates, allowing you to react accordingly in your application.'
  );
};

const connect = ({
  apiKey = '',
  onChangedSignIn = defaultOnChangedSignIn,
} = {}) => {
  if (initializedConnectInstance) {
    return initializedConnectInstance;
  }

  const brand = 'Greenruhm Connect';
  if (!apiKey) throw new Error(`${brand}: Missing API key`);

  const middleware = [signInStatusChanged(onChangedSignIn)];
  const store = createStore({ middleware });

  // Set API key in store:
  store.dispatch(updateApiKeyAction(apiKey));

  const withMiddleware = asyncPipe(withStore(store));

  initializedConnectInstance = {
    signIn: () =>
      asyncPipe(withMiddleware, withMagicConnect, signInThroughMagicConnect)(),
    signInErrors,
    handleSignInErrors,
    signUp: ({ username = '', displayName = username } = {}) =>
      asyncPipe(
        withMiddleware,
        withMagicConnect,
        signUpThroughMagicConnect
      )({ username, displayName }),
    signUpErrors,
    handleSignUpErrors,
    signOut: () =>
      asyncPipe(withMiddleware, withMagicConnect, signOutThroughMagicConnect)(),
    createDrop: ({ title = '', description = '', editionLimit = 0 } = {}) =>
      asyncPipe(
        withMiddleware,
        createDrop
      )({ title, description, editionLimit }),
    addMedia: (dropId) => (params) =>
      asyncPipe(withMiddleware, addMedia(dropId))(params),
    // TODO
    checkSignInStatus: () =>
      asyncPipe(withMiddleware, withMagicConnect, checkSignInStatus)(),
  };

  if (typeof window !== 'undefined') {
    initializedConnectInstance
      .checkSignInStatus()
      .then(async ({ isSignedIn, dispatch, magic }) => {
        // if the user is not signed in with magic connect, we need to make sure they're
        // signed out in our state. (set anon)
        if (!isSignedIn) return dispatch(setAnonUser());

        // if they don't match, sign them out of magic, and set anon in our state.
        const currentUserInStore = getUser();

        const { email } = await magic.user.getMetadata();

        if (currentUserInStore.email !== email) {
          dispatch(setAnonUser());
          await magic.user.logout();
        }
      });
  }

  return initializedConnectInstance;
};

/**
 *
 *
 * Checks the sign-in status of a user using Magic SDK.
 * @param {import('magic-sdk')} magic - The Magic SDK instance. Imported from 'magic-sdk'.
 * @returns {Promise<boolean>} A promise that resolves with the sign-in status.
 */

async function checkSignInStatus({ magic, dispatch }) {
  const isSignedIn = await magic.user.isLoggedIn();
  return { isSignedIn, dispatch, magic };
}

module.exports = connect;
module.exports.useConnect = connect;
