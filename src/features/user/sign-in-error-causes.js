const { errorCauses } = require('error-causes');
const { commonErrorCauses } = require('./common-error-causes');

const [signInErrors, handleSignInErrors] = errorCauses({
  ...commonErrorCauses,
  AccountNotFound: {
    code: 404,
    message: 'An account was not found. Please sign up.',
  },
  AuthUserRejectedConsentToShareEmail: {
    code: -99999,
    message:
      'To sign in with Greenruhm you must consent to sharing your email.',
  },
});

module.exports.signInErrors = signInErrors;
module.exports.handleSignInErrors = handleSignInErrors;
