const createUser = ({
  email = '',
  walletAddress = '',
  sessionToken = '',
  isSignedIn = false,
} = {}) => ({
  email,
  walletAddress,
  sessionToken,
  isSignedIn,
});

const initialState = createUser();

const slice = 'user';

// Action Creators
const setUser = (user) => ({
  payload: user,
  type: setUser.type,
});
setUser.type = `${slice}/setUser`;

const setAnonUser = (user = initialState) => ({
  payload: user,
  type: setAnonUser.type,
});
setAnonUser.type = `${slice}/setAnonUser`;

const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case setUser.type:
      return payload;
    case setAnonUser.type:
      return initialState;
    default:
      return state;
  }
};

// Selectors

const getUserIsSignedIn = (state) => state && state[slice].isSignedIn;

const getUserName = (state) => state && state[slice].username;

const getUser = (state) => state && state[slice];

module.exports.createUser = createUser;
module.exports.initialState = initialState;
module.exports.slice = slice;
module.exports.reducer = reducer;
module.exports.setUser = setUser;
module.exports.setAnonUser = setAnonUser;
module.exports.getUserIsSignedIn = getUserIsSignedIn;
module.exports.getUserName = getUserName;
module.exports.getUser = getUser;
