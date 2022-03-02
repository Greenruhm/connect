import { apiStatuses } from '../reducer/index';

// TODO: VALIDATE API KEY IN DATABASE;
const isValidApiKey = async apiKey => !!apiKey;

const checkApiKey = async params => {
  const { getApiStatus, getApiKey, updateApiStatus } = params;
  const apiStatus = getApiStatus();
  const invalidError = 'Invalid API Key for Greenruhm Connect';

  // We already know it's invalid.
  if (apiStatus === apiStatuses.Invalid) throw new Error(invalidError);

  // We already know it's valid.
  if (apiStatus === apiStatuses.Valid) return params;

  // Check
  if (!(await isValidApiKey(getApiKey()))) {
    updateApiStatus(apiStatuses.Invalid);
    throw new Error(invalidError);
  }

  // Check passed, set valid status!
  updateApiStatus(apiStatuses.Valid);

  return params;
};

export default checkApiKey;
