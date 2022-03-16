import dropApi from './features/drop/api';
import userApi from './features/user/api';
import { checkApiKey } from './features/apiKey/api';
import { asyncPipe, withStore } from './utils';
import {
  updateApiKeyAction,
  getUserIsSignedIn
} from './features/apiKey/reducer';

import store from './redux/store';

const requiresAuth = userApi.requiresAuth;

export const connect = ({ apiKey = '' }) => {
  store.dispatch(updateApiKeyAction(apiKey));

  const withMiddleware = asyncPipe(withStore(store), checkApiKey);

  const createDrop = ({
    username = '',
    title = '',
    description = '',
    editionLimit = 0
  } = {}) =>
    asyncPipe(
      withMiddleware,
      requiresAuth({
        errorMsg: 'You must be signed in to create a drop.',
        predicate: getUserIsSignedIn(store.getState())
      }),
      dropApi.createDrop
    )({ username, title, description, editionLimit });

  const getDrop = (dropId = '') =>
    asyncPipe(
      withMiddleware,
      requiresAuth({
        errorMsg: 'You must be signed in to get a drop.',
        predicate: getUserIsSignedIn(store.getState())
      }),
      dropApi.getDrop
    )({ dropId });

  const addMedia = (dropId = '', { embedImage, posterImage, video } = {}) =>
    asyncPipe(
      withMiddleware,
      requiresAuth({
        errorMsg: 'You must be signed in to update a drop.',
        predicate: getUserIsSignedIn(store.getState())
      }),
      dropApi.addMedia
    )({ dropId, embedImage, posterImage, video });

  const signInUser = (email = '') =>
    asyncPipe(withMiddleware, userApi.signInUser)({ email });

  return {
    createDrop,
    getDrop,
    addMedia,
    signInUser
  };
};

export default connect;
