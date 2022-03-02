import { getDrop, addMedia, createDrop } from './features/drop';
import { signInUser, requiresUserAuth } from './features/user';
import { checkApiKey } from './features/apiKey';
import { asyncPipe } from './utils';
import {
  getUser,
  getApiStatus,
  getApiKey,
  updateApiKey,
  updateApiStatus,
  updateUser,
  wrapDispatch,
  dispatch
} from './reducer';

export const connect = ({ apiKey }) => {
  dispatch(updateApiKey(apiKey));
  const context = {
    getApiKey,
    getApiStatus,
    getUser,
    updateApiStatus: wrapDispatch(updateApiStatus),
    updateApiKey: wrapDispatch(updateApiKey),
    updateUser: wrapDispatch(updateUser)
  };

  return {
    createDrop: ({
      username = '',
      title = '',
      description = '',
      editionLimit = 0
    } = {}) =>
      asyncPipe(
        checkApiKey,
        requiresUserAuth,
        createDrop
      )({ username, title, description, editionLimit, ...context }),
    getDrop: (id = '') =>
      asyncPipe(checkApiKey, requiresUserAuth, getDrop)({ id, ...context }),
    addMedia: (
      dropId,
      { embedImage = null, posterImage = null, video = null } = {}
    ) =>
      asyncPipe(
        checkApiKey,
        requiresUserAuth,
        addMedia
      )(dropId, { embedImage, posterImage, video, ...context }),
    signInUser: (email = '') =>
      asyncPipe(checkApiKey, signInUser)({ email, ...context })
  };
};

export default connect;
