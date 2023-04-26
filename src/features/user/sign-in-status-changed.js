const { getUserIsSignedIn, setUser, setAnonUser } = require('./reducer');

const signInStatusChanged = (onChangedSignIn) => (state, action) => {
  if ([setUser.type, setAnonUser.type].includes(action.type)) {
    const signedIn = getUserIsSignedIn(state);
    const updatedSignedIn = action.payload.isSignedIn;
    if (signedIn !== updatedSignedIn) {
      onChangedSignIn();
    }
  }

  return state;
};

module.exports = signInStatusChanged;
