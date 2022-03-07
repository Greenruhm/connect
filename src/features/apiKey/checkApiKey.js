import {
  getApiStatus,
  getApiKey,
  apiStatuses,
  updateApiStatus
} from './reducer';

// TODO: VALIDATE API KEY IN DATABASE;
const isValidApiKey = async apiKey => !!apiKey;

const checkApiKey = async params => {
  const { store } = params;
  const apiStatus = getApiStatus(store.getState());
  const invalidError = 'Invalid API Key for Greenruhm Connect';

  // We already know it's invalid.
  if (apiStatus === apiStatuses.Invalid) throw new Error(invalidError);

  // We already know it's valid.
  if (apiStatus === apiStatuses.Valid) return params;

  // Check
  if (!(await isValidApiKey(getApiKey(store.getState())))) {
    store.dispatch(updateApiStatus(apiStatuses.Invalid));
    throw new Error(invalidError);
  }

  // Check passed, set valid status!
  store.dispatch(updateApiStatus(apiStatuses.Valid));

  return params;
};

export default checkApiKey;
