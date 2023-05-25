const { isActiveFeatureName } = require('@paralleldrive/feature-toggles');
const {
  signIn,
  signInThroughMagicConnect,
} = require('./features/user/sign-in');
const {
  signInErrors,
  handleSignInErrors,
} = require('./features/user/sign-in-error-causes');
const {
  signUp,
  signUpThroughMagicConnect,
} = require('./features/user/sign-up');
const {
  signUpErrors,
  handleSignUpErrors,
} = require('./features/user/sign-up-error-causes');
const {
  signOut,
  signOutThroughMagicConnect,
} = require('./features/user/sign-out');
const { addMedia } = require('./features/drop/create');
const { createDrop } = require('./features/drop/add-media');
const { withMagic, withMagicConnect } = require('./features/user/with-magic');
const { asyncPipe, withStore } = require('./utils');
const { updateApiKeyAction } = require('./features/api-key/reducer');
const createStore = require('./reducer/store');
const signInStatusChanged = require('./features/user/sign-in-status-changed');

const defaultOnChangedSignIn = () => {
  console.log(
    'The signed-in status of the user has changed. To handle this change, consider passing a function to the connect creator as `onChangedSignIn`. This function will be called whenever the signed-in status updates, allowing you to react accordingly in your application.'
  );
};

const connect = ({
  apiKey = '',
  features = [],
  onChangedSignIn = defaultOnChangedSignIn,
} = {}) => {
  const brand = 'Greenruhm Connect';
  if (!apiKey) throw new Error(`${brand}: Missing API key`);

  const middleware = [signInStatusChanged(onChangedSignIn)];
  const store = createStore({ middleware });

  // Set API key in store:
  store.dispatch(updateApiKeyAction(apiKey));

  const withMiddleware = asyncPipe(withStore(store));

  return {
    signIn: isActiveFeatureName('magic-connect', features)
      ? () =>
          asyncPipe(
            withMiddleware,
            withMagicConnect,
            signInThroughMagicConnect
          )()
      : ({ email = '' } = {}) =>
          asyncPipe(withMiddleware, withMagic, signIn)({ email }),
    signInErrors,
    handleSignInErrors,
    signUp: isActiveFeatureName('magic-connect', features)
      ? ({ username = '', displayName = username } = {}) =>
          asyncPipe(
            withMiddleware,
            withMagicConnect,
            signUpThroughMagicConnect
          )({ username, displayName })
      : ({ email = '', username = '', displayName = username } = {}) =>
          asyncPipe(
            withMiddleware,
            withMagic,
            signUp
          )({ email, username, displayName }),
    signUpErrors,
    handleSignUpErrors,
    signOut: isActiveFeatureName('magic-connect', features)
      ? () =>
          asyncPipe(
            withMiddleware,
            withMagicConnect,
            signOutThroughMagicConnect
          )()
      : () => asyncPipe(withMiddleware, withMagic, signOut)(),
    createDrop: ({ title = '', description = '', editionLimit = 0 } = {}) =>
      asyncPipe(
        withMiddleware,
        createDrop
      )({ title, description, editionLimit }),
    addMedia: (dropId) => (params) =>
      asyncPipe(withMiddleware, addMedia(dropId))(params),
  };
};

module.exports = connect;
