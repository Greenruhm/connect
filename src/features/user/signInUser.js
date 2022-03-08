import { setUserAction } from './reducer';

const signInUser = ({ email, dispatch }) => {
  if (!email) {
    throw new Error('Email Required to Sign In User');
  }

  // TODO: GET REAL USER FROM DATABASE
  const user = {
    email,
    walletId: '123fakeId',
    username: 'fakeuser',
    displayName: 'Fake User',
    isSignedIn: true
  };
  dispatch(setUserAction(user));
  return user;
};

export default signInUser;
