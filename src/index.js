import signUp from './features/user/signUp';
import withMagic from './features/user/withMagic';

const asyncPipe = (...fns) => x => fns.reduce(async (y, f) => f(y), x);

export const connect = ({ apiKey = '' } = {}) => {
  const brand = 'Greenruhm Connect';

  if (!apiKey) throw new Error(`${brand}: Missing API key`);

  return {
    signUp: ({ email = '', username = '', displayName = '' } = {}) =>
      asyncPipe(withMagic, signUp)({ email, username, displayName })
  };
};

export default connect;
