import { setAnonUser } from './reducer';

const signOutUser = async ({ magic } = {}) => {
  const isLoggedIn = await magic.user.isLoggedIn();

  if (isLoggedIn) {
    await magic.user.logout();
  }
  setAnonUser();

  return;
};

export default signOutUser;
