export const apiStates = {
  Invalid: 'Invalid',
  Valid: 'Valid',
  Unknown: 'Unknown'
};
const initialState = {
  apiKey: null,
  status: apiStates.Unknown
};
export const slice = 'apiKey';
export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case updateApiKeyAction.type:
      state.apiKey = payload;
      return state;
    case addApiStateToActionCreator.type:
      state.status = payload;
      return state;
    default:
      return state;
  }
};

const addApiStateToActionCreator = (type = apiStates.Unknown) => () => ({
  payload: type,
  type: addApiStateToActionCreator.type
});
addApiStateToActionCreator.type = `${slice}/updateApiStatus`;

//action creators
export const updateApiStatusUnkownAction = addApiStateToActionCreator(
  apiStates.Unknown
);
export const updateApiStatusValidAction = addApiStateToActionCreator(
  apiStates.Valid
);
export const updateApiStatusInvalidAction = addApiStateToActionCreator(
  apiStates.Invalid
);
export const updateApiKeyAction = apiKey => ({
  payload: apiKey,
  type: updateApiKeyAction.type
});
updateApiKeyAction.type = `${slice}/updateApiKey`;

// Selectors
export const getApiKey = state => state[slice].apiKey;
export const getApiStatus = state => state[slice].status;
export const getIsReady = state => state[slice].status !== apiStates.Unknown;
export const getIsValid = state => state[slice].status === apiStates.Valid;
