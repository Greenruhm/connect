export const apiStatuses = {
  Invalid: 'Invalid',
  Valid: 'Valid',
  Unknown: 'Unknown'
};
const initialState = {
  apiKey: null,
  status: apiStatuses.Unknown
};
export const slice = 'apiKey';
export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case updateApiKey.type:
      state.apiKey = payload;
      return state;
    case updateApiStatus.type:
      state.status = payload;
      return state;
    default:
      return state;
  }
};

//action creators
export const updateApiStatus = (status = apiStatuses.Unknown) => ({
  payload: status,
  type: updateApiStatus.type
});
updateApiStatus.type = `${slice}/updateApiStatus`;
export const updateApiKey = apiKey => ({
  payload: apiKey,
  type: updateApiKey.type
});
updateApiKey.type = `${slice}/updateApiKey`;

// Selectors
export const getApiKey = state => state[slice].apiKey;
export const getApiStatus = state => state[slice].apiStatus;
