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
  };

  return initializedConnectInstance;
};

module.exports = connect;
module.exports.useConnect = connect;
