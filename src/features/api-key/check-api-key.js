import {
  getIsReady,
  getIsValid,
  getApiKey,
  updateApiStatusInvalidAction,
  updateApiStatusValidAction,
} from './reducer';

// TODO: VALIDATE API KEY IN DATABASE;
const isValidApiKey = async (apiKey) => !!apiKey;

const checkApiKey = async (params) => {
  const { getState, dispatch } = params;
  const state = getState();
  const isReady = getIsReady(state);
  const isValid = getIsValid(state);
  const invalidError = 'Invalid API Key for Greenruhm Connect';

  // We already know it's invalid.
  if (isReady && !isValid) throw new Error(invalidError);

  // We already know it's valid.
  if (isReady && isValid) return params;

  // Check
  if (!(await isValidApiKey(getApiKey(state)))) {
    dispatch(updateApiStatusInvalidAction());
    throw new Error(invalidError);
  }

  // Check passed, set valid status!
  dispatch(updateApiStatusValidAction());

  return params;
};

export default checkApiKey;
