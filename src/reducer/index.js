export const apiStatuses = {
  Invalid: 'Invalid',
  Valid: 'Valid',
  Unknown: 'Unknown'
};
const state = {
  apiKey: null,
  user: {},
  apiStatus: apiStatuses.Unknown
};
export const reducer = (state = state, { type, payload } = {}) => {
  switch (type) {
    case updateApiKey.type:
      state.apiKey = payload;
      return state;
    case updateApiStatus.type:
      state.apiStatus = payload;
      return state;
    case updateUser.type:
      state.user = payload;
      return state;
    default:
      return state;
  }
};
export const dispatch = action => reducer(state, action);
export const wrapDispatch = func => payload => dispatch(func(payload));

// Action Creators
export const updateUser = user => ({
  payload: user,
  type: updateUser.type
});
updateUser.type = 'user/updateUser';
export const updateApiStatus = (status = apiStatuses.Unknown) => ({
  payload: status,
  type: updateApiStatus.type
});
export const updateApiKey = apiKey => ({
  payload: apiKey,
  type: updateApiKey.type
});
updateApiKey.type = 'connect/updateApiKey';

// Selectors
export const getApiKey = () => state.apiKey;
export const getApiStatus = () => state.apiStatus;
export const getUser = () => state.user;
