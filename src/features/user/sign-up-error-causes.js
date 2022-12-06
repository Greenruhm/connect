const { errorCauses } = require('error-causes');
const { commonErrorCauses } = require('./common-error-causes');

/**
 * For context around Auth related errors reference:
 * https://magic.link/docs/auth/api-reference/client-side-sdks/web#errors-warnings
 */
const [signUpErrors, handleSignUpErrors] = errorCauses({
  ...commonErrorCauses,
  AccountAlreadyExists: {
    code: 400,
    message:
      "You tried to sign up with an email that already has an account. Please sign in instead, or provide a different email if you'd like to create a different account.",
  },
  AuthUserRejectedConsentToShareEmail: {
    code: -99999,
    message:
      'To sign up with Greenruhm you must consent to sharing your email.',
  },
  InvalidEmail: {
    code: 400,
    message: 'An invalid email was provided. Please provide a valid email.',
  },
  InvalidUserName: {
    code: 400,
    message:
      'An invalid username was provided. Please provide a valid username.',
  },
  UsernameIsUnavailable: {
    code: 400,
    message:
      'The requested username is unavailable. Please try a different username.',
  },
  UsernameIsRequired: {
    code: 400,
    message: 'A username is required. Please provide a valid username.',
  },
});

module.exports.signUpErrors = signUpErrors;
module.exports.handleSignUpErrors = handleSignUpErrors;
