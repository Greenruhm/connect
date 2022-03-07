import { getDrop, addMedia, createDrop } from './features/drop';
import { signInUser, requiresUserAuth } from './features/user';
import { checkApiKey } from './features/apiKey';
import { asyncPipe, withStore } from './utils';
import { updateApiKey } from './features/apiKey/reducer';

import store from './redux/store';

export const connect = ({ apiKey }) => {
  store.dispatch(updateApiKey(apiKey));
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
    getDrop: (id = '') =>
      asyncPipe(withMiddleware, requiresUserAuth, getDrop)({ id }),
    addMedia: (
      dropId,
      { embedImage = null, posterImage = null, video = null } = {}
    ) =>
      asyncPipe(
        withMiddleware,
        requiresUserAuth,
        addMedia
      )(dropId, { embedImage, posterImage, video }),
    signInUser: (email = '') => asyncPipe(withMiddleware, signInUser)({ email })
  };
};
export default connect;
