const initialState = {
  isSignedIn: false
};
export const slice = 'user';
export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case setUserAction.type:
      state = payload;
      return state;
    default:
      return state;
  }
};

// Action Creators
export const setUserAction = user => ({
  payload: user,
  type: setUserAction.type
});
setUserAction.type = `${slice}/setUser`;

// Selectors
export const getUserIsSignedIn = state => state[slice].isSignedIn;
