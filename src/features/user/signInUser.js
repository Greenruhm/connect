const signInUser = context => (email = 'fake@example.com') => {
  // TODO: GET REAL USER FROM DATABASE
  const user = {
    email,
    walletId: '123fakeId',
    username: 'fakeuser',
    displayName: 'Fake User',
    isSignedIn: true
  };
  context.update({ user });
  return user;
};

export default signInUser;
