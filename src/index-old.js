import drop from './features/drop/api';
import user from './features/user/api';
// import { checkApiKey } from './features/apiKey/api';
import { asyncPipe, withStore } from './utils';
import { updateApiKeyAction } from './features/apiKey/reducer';
import { getUserIsSignedIn } from './features/user/reducer';
import store from './reducer/store';

const { requiresAuth } = user;

const requiresSignIn = errorMsg =>
  requiresAuth({
    errorMsg,
    predicate: params => getUserIsSignedIn(params.getState())
  });

export const connect = ({ apiKey = '' }) => {
  store.dispatch(updateApiKeyAction(apiKey));

  const withMiddleware = asyncPipe(withStore(store));

  const createDrop = ({
    username = '',
    title = '',
    description = '',
    editionLimit = 0
  } = {}) =>
    asyncPipe(
      withMiddleware,
      requiresSignIn('You must be signed in to create a drop.'),
      drop.createDrop
    )({ username, title, description, editionLimit });

  const getDrop = (dropId = '') =>
    asyncPipe(
      withMiddleware,
      requiresSignIn('You must be signed in to get a drop'),
      drop.getDrop
    )({ dropId });

  const signIn = (email = '') =>
    asyncPipe(withMiddleware, user.withMagic, user.signInUser)({ email });

  const signUp = ({ email = '', username = '', displayName = '' } = {}) =>
    asyncPipe(
      withMiddleware,
      user.withMagic,
      user.signUp
    )({ email, username, displayName });

  return {
    signUp,
    signIn,
    createDrop,
    getDrop
  };
};

export default connect;
