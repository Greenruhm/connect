import { isActiveFeatureName } from '@paralleldrive/feature-toggles';
import signIn, {
  signInThroughMagicConnect,
  withSignInErrors,
  handleSignInErrors,
} from './features/user/sign-in';
import signUp, {
  signUpThroughMagicConnect,
  withSignUpErrors,
  handleSignUpErrors,
} from './features/user/sign-up';
import signOut, { signOutThroughMagicConnect } from './features/user/sign-out';
import withMagic, { withMagicConnect } from './features/user/with-magic';
import { asyncPipe, withStore } from './utils';
import { updateApiKeyAction } from './features/apiKey/reducer';
import store from './reducer/store';

export const connect = ({ apiKey = '', features = [] } = {}) => {
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

export default connect;
