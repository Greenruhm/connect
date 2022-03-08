import { getDrop, addMedia, createDrop } from './features/drop/api';
import { signInUser, requiresUserAuth } from './features/user/api';
import { checkApiKey } from './features/apiKey/api';
import { asyncPipe, withStore } from './utils';
import { updateApiKeyAction } from './features/apiKey/reducer';

import store from './redux/store';

export const connect = ({ apiKey = '' }) => {
  store.dispatch(updateApiKeyAction(apiKey));
  const withMiddleware = asyncPipe(withStore(store), checkApiKey);
  return {
    createDrop: ({
      username = '',
      title = '',
      description = '',
      editionLimit = 0
    } = {}) =>
      asyncPipe(
        withMiddleware,
        requiresUserAuth,
        createDrop
      )({ username, title, description, editionLimit }),
    getDrop: (dropId = '') =>
      asyncPipe(withMiddleware, requiresUserAuth, getDrop)({ dropId }),
    addMedia: (dropId = '', { embedImage, posterImage, video } = {}) =>
      asyncPipe(
        withMiddleware,
        requiresUserAuth,
        addMedia
      )({ dropId, embedImage, posterImage, video }),
    signInUser: (email = '') => asyncPipe(withMiddleware, signInUser)({ email })
  };
};
export default connect;
