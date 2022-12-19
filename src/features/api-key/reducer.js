const apiStates = {
  Invalid: 'Invalid',
  Valid: 'Valid',
  Unknown: 'Unknown',
};
const initialState = {
  apiKey: null,
  status: apiStates.Unknown,
};
const slice = 'apiKey';
const reducer = (state = initialState, { type, payload } = {}) => {
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

const addApiStateToActionCreator =
  (type = apiStates.Unknown) =>
  () => ({
    payload: type,
    type: addApiStateToActionCreator.type,
  });
addApiStateToActionCreator.type = `${slice}/updateApiStatus`;

//action creators
const updateApiStatusUnkownAction = addApiStateToActionCreator(
  apiStates.Unknown
);
const updateApiStatusValidAction = addApiStateToActionCreator(apiStates.Valid);
const updateApiStatusInvalidAction = addApiStateToActionCreator(
  apiStates.Invalid
);
const updateApiKeyAction = (apiKey) => ({
  payload: apiKey,
  type: updateApiKeyAction.type,
});
updateApiKeyAction.type = `${slice}/updateApiKey`;

// Selectors
const getApiKey = (state) => state[slice].apiKey;
const getApiStatus = (state) => state[slice].status;
const getIsReady = (state) => state[slice].status !== apiStates.Unknown;
const getIsValid = (state) => state[slice].status === apiStates.Valid;

module.exports.apiStates = apiStates;
module.exports.slice = slice;
module.exports.reducer = reducer;
module.exports.updateApiStatusUnkownAction = updateApiStatusUnkownAction;
module.exports.updateApiStatusValidAction = updateApiStatusValidAction;
module.exports.updateApiStatusInvalidAction = updateApiStatusInvalidAction;
module.exports.updateApiKeyAction = updateApiKeyAction;
module.exports.getApiKey = getApiKey;
module.exports.getApiStatus = getApiStatus;
module.exports.getIsReady = getIsReady;
module.exports.getIsValid = getIsValid;
