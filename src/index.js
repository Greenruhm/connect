const { isActiveFeatureName } = require('@paralleldrive/feature-toggles');
const {
  signIn,
  signInThroughMagicConnect,
  signInErrors,
  handleSignInErrors,
  withSignInErrors,
} = require('./features/user/sign-in');
const {
  signUp,
  signUpThroughMagicConnect,
  signUpErrors,
  handleSignUpErrors,
  withSignUpErrors,
} = require('./features/user/sign-up');
const {
  signOut,
  signOutThroughMagicConnect,
} = require('./features/user/sign-out');
const { withMagic, withMagicConnect } = require('./features/user/with-magic');

const { asyncPipe, withStore } = require('./utils');
const { updateApiKeyAction } = require('./features/apiKey/reducer');
const store = require('./reducer/store');

const connect = ({ apiKey = '', features = [] } = {}) => {
  const brand = 'Greenruhm Connect';
  if (!apiKey) throw new Error(`${brand}: Missing API key`);

  // Set API key in store:
  store.dispatch(updateApiKeyAction(apiKey));

  const withMiddleware = asyncPipe(withStore(store));

  return {
    signIn: isActiveFeatureName('magic-connect', features)
      ? () =>
          asyncPipe(
            withMiddleware,
            withMagicConnect,
            withSignInErrors,
            signInThroughMagicConnect
          )()
      : ({ email = '' } = {}) =>
          asyncPipe(
            withMiddleware,
            withMagic,
            withSignInErrors,
            signIn
          )({ email }),
    signInErrors,
    handleSignInErrors,
    signUp: isActiveFeatureName('magic-connect', features)
      ? ({ username = '', displayName = username } = {}) =>
          asyncPipe(
            withMiddleware,
            withMagicConnect,
            withSignUpErrors,
            signUpThroughMagicConnect
          )({ username, displayName })
      : ({ email = '', username = '', displayName = username } = {}) =>
          asyncPipe(
            withMiddleware,
            withMagic,
            withSignUpErrors,
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
  };
};

module.exports = connect;
