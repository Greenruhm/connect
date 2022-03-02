export const apiStatuses = {
  Invalid: 'Invalid',
  Valid: 'Valid',
  Unknown: 'Unknown'
};

// TODO: VALIDATE API KEY IN DATABASE;
const isValidApiKey = apiKey => !!apiKey;

const checkApiKey = context => async params => {
  const { apiStatus, apiKey } = context;
  const invalidError = 'Invalid API Key for Greenruhm Connect';

  // We already know it's invalid.
  if (apiStatus === apiStatuses.Invalid) throw new Error(invalidError);

  // We already know it's valid.
  if (apiStatus === apiStatuses.Valid) return params;

  // Check
  if (!(await isValidApiKey(apiKey))) {
    context.update({ apiStatus: apiStatuses.Invalid });
    throw new Error(invalidError);
  }

  // Check passed, set valid status!
  context.update({ apiStatus: apiStatuses.Valid });

  return params;
};

export default checkApiKey;
