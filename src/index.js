import signIn, { signInThroughMagicConnect } from './features/user/sign-in';
import signUp, { signUpThroughMagicConnect } from './features/user/sign-up';
import signOut, { signOutThroughMagicConnect } from './features/user/sign-out';
import withMagic, { withMagicConnect } from './features/user/withMagic';
import { asyncPipe, withStore } from './utils';
import { updateApiKeyAction } from './features/apiKey/reducer';
import store from './reducer/store';

export const connect = ({ apiKey = '' } = {}) => {
  const brand = 'Greenruhm Connect';
  if (!apiKey) throw new Error(`${brand}: Missing API key`);

  // Set API key in store:
  store.dispatch(updateApiKeyAction(apiKey));

  const withMiddleware = asyncPipe(withStore(store));

  return {
    signIn: ({ email = '' } = {}) =>
      asyncPipe(withMiddleware, withMagic, signIn)({ email }),
    signUp: ({ email = '', username = '', displayName = username } = {}) =>
      asyncPipe(
        withMiddleware,
        withMagic,
        signUp
      )({ email, username, displayName }),
    signOut: () => asyncPipe(withMiddleware, withMagic, signOut)(),
    signUpThroughMagicConnect: ({
      username = '',
      displayName = username,
    } = {}) =>
      asyncPipe(
        withMiddleware,
        withMagicConnect,
        signUpThroughMagicConnect
      )({ username, displayName }),
    signInThroughMagicConnect: () =>
      asyncPipe(withMiddleware, withMagicConnect, signInThroughMagicConnect)(),
    signOutThroughMagicConnect: () =>
      asyncPipe(withMiddleware, withMagicConnect, signOutThroughMagicConnect)(),
  };
};

export default connect;
