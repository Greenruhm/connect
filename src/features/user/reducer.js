export const createUser = ({
  email = '',
  walletAddress = '',
  sessionToken = '',
  isSignedIn = false
} = {}) => ({
  email,
  walletAddress,
  sessionToken,
  isSignedIn
});

export const initialState = createUser();

export const slice = 'user';
export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case setUser.type:
      return payload;
    case setAnonUser.type:
      return initialState;
    default:
      return state;
  }
};

// Action Creators
export const setUser = user => ({
  payload: user,
  type: setUser.type
});
setUser.type = `${slice}/setUser`;

export const setAnonUser = user => ({
  payload: user,
  type: setAnonUser.type
});
setAnonUser.type = `${slice}/setAnonUser`;

// Selectors
export const getUserIsSignedIn = state => state[slice].isSignedIn;
export const getUserName = state => state[slice].username;
