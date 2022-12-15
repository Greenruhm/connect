const { magicErrorCauses } = require('./with-magic');

const commonErrorCauses = {
  ...magicErrorCauses,
  EmailIsRequired: {
    code: 400,
    message: 'An email is required. Please provide a valid email.',
  },
  InternalServerError: {
    code: 500,
    message: 'There was an unexpected error. Please try again.',
  },
};

module.exports.commonErrorCauses = commonErrorCauses;
