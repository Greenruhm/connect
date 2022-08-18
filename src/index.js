import signIn from './features/user/sign-in';
import signUp from './features/user/sign-up';
import withMagic from './features/user/withMagic';
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
      asyncPipe(withMiddleware, withMagic, signIn)({ email, ...withMagic({}) }),
    signUp: ({ email = '', username = '', displayName = '' } = {}) =>
      asyncPipe(
        withMiddleware,
        withMagic,
        signUp
      )({ email, username, displayName, ...withMagic({}) })
  };
};

export default connect;
