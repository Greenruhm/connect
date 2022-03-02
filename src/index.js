import { getDrop, addMedia, createDrop } from './features/drop';
import { signInUser, requiresUserAuth } from './features/user';
import { checkApiKey, apiStatuses } from './features/apiKey';
import { asyncPipeWithContext } from './utils';

export const connect = ({ apiKey }) => {
  let context = {
    apiKey,
    user: {},
    apiStatus: apiStatuses.Unknown,
    update(data = {}) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        this[key] = data[key];
      });
      return this;
    }
  };

  const asyncPipe = asyncPipeWithContext(context);

  return {
    createDrop: asyncPipe(checkApiKey, requiresUserAuth, createDrop),
    getDrop: asyncPipe(checkApiKey, requiresUserAuth, getDrop),
    addMedia: asyncPipe(checkApiKey, requiresUserAuth, addMedia),
    signInUser: asyncPipe(checkApiKey, signInUser)
  };
};

export default connect;
