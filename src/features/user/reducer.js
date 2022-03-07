const initialState = {};
export const slice = 'user';
export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case setUser.type:
      state = payload;
      return state;
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

// Selectors
export const getUser = state => state[slice];
