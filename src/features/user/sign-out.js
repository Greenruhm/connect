import { setAnonUser } from './reducer';

const signOutUser = async ({ dispatch, magic } = {}) => {
  const isLoggedIn = await magic.user.isLoggedIn();

  if (isLoggedIn) {
    await magic.user.logout();
  }
  dispatch(setAnonUser());

  return;
};

export default signOutUser;
