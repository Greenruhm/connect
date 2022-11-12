import { setAnonUser } from './reducer';

export const signOutThroughMagicConnect = ({ dispatch, magic } = {}) => {
  console.log('called sign out through magic connect!!!');
  magic.connect.disconnect();
  dispatch(setAnonUser());
};

const signOutUser = async ({ dispatch, magic } = {}) => {
  const isLoggedIn = await magic.user.isLoggedIn();

  if (isLoggedIn) {
    await magic.user.logout();
  }
  dispatch(setAnonUser());

  return;
};

export default signOutUser;
