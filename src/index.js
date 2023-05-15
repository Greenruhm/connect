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
const { createDrop } = require('./features/drop/api');
const { withMagic, withMagicConnect } = require('./features/user/with-magic');
const { asyncPipe, withStore } = require('./utils');
const { updateApiKeyAction } = require('./features/api-key/reducer');
const createStore = require('./reducer/store');

const connect = ({ apiKey = '', features = [] } = {}) => {
  const brand = 'Greenruhm Connect';
  if (!apiKey) throw new Error(`${brand}: Missing API key`);

  const store = createStore();

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
      asyncPipe(withMiddleware, createDrop)({ title, description, editionLimit }),
  };
};

module.exports = connect;
