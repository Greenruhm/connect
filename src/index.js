import { isActiveFeatureName } from '@paralleldrive/feature-toggles';
import signIn, {
  handleSignInErrors,
  signInErrors,
  signInThroughMagicConnect,
} from './features/user/sign-in';
import signUp, {
  handleSignUpErrors,
  signUpErrors,
  signUpThroughMagicConnect,
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
  };
};

export default connect;
