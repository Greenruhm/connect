'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: () => _default,
});
const _jsxRuntime = require('react/jsx-runtime');
const _react = _interopRequireDefault(require('react'));
const _submitButtonComponent = _interopRequireDefault(
  require('../shared/submit-button-component')
);
const _successView = _interopRequireDefault(require('../shared/success-view'));
const _errorModal = _interopRequireDefault(require('../shared/error-modal'));
const _signInControllerComponent = require('./sign-in-controller-component');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      };
}
const styles = {
  a: {
    textDecoration: 'underline',
  },
  h2: {
    fontSize: '32px',
    fontWeight: 'normal',
    lineHeight: '35.2px',
  },
  page: {
    color: '#fff',
    fontFamily: 'Work Sans, sans-serif',
    margin: '24px auto 0',
    maxWidth: '800px',
    padding: '10px 40px 64px',
    position: 'relative',
  },
  signUp: {
    marginTop: '2rem',
    opacity: '0.8',
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: '650px',
    position: 'relative',
  },
};
const noop = () => {};
const SignUpLink = ({ href, label }) => {
  return (0, _jsxRuntime.jsx)('div', {
    className: 'sign-up',
    style: styles.signUp,
    children: (0, _jsxRuntime.jsx)('a', {
      href: href,
      style: styles.a,
      children: label,
    }),
  });
};
const SignInFormView = ({ authStatus, disabled, handleSignIn } = {}) => {
  return (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [
      (0, _jsxRuntime.jsx)('h2', {
        style: styles.h2,
        children: 'Sign In (connect)',
      }),
      (0, _jsxRuntime.jsx)(_submitButtonComponent.default, {
        disabled: disabled,
        label: 'Sign In',
        loading:
          authStatus === _signInControllerComponent.AuthStatuses.SigningIn,
        name: 'sign-in',
        onClick: handleSignIn,
      }),
      (0, _jsxRuntime.jsx)(SignUpLink, {
        href: '/sign-up-connect',
        label: 'Or Sign Up',
      }),
    ],
  });
};
const renderView = ({
  authStatus,
  disabled,
  email,
  handleSignIn,
  handleSignOut,
  username,
} = {}) =>
  authStatus === _signInControllerComponent.AuthStatuses.SignedOut ||
  authStatus === _signInControllerComponent.AuthStatuses.SigningIn
    ? SignInFormView({
        authStatus,
        disabled,
        handleSignIn,
      })
    : (0, _successView.default)({
        email,
        handleSignOut,
        successMessage: `Welcome ${username}. You are signed in! 🎉`,
        username,
      });
const SignInView = ({
  authStatus = _signInControllerComponent.AuthStatuses.SignedOut,
  clearErrors = noop,
  disabled = false,
  email = '',
  errors = [],
  handleSignIn = noop,
  handleSignOut = noop,
  username = '',
} = {}) => {
  return (0, _jsxRuntime.jsx)('div', {
    className: 'box-format font-format',
    style: styles.page,
    children: (0, _jsxRuntime.jsxs)('div', {
      className: 'sign-in-wrapper',
      style: styles.wrapper,
      children: [
        renderView({
          authStatus,
          disabled,
          email,
          handleSignIn,
          handleSignOut,
          username,
        }),
        errors.length
          ? (0, _jsxRuntime.jsx)(_errorModal.default, {
              errorMessage: errors[0],
              onClose: clearErrors,
            })
          : null,
      ],
    }),
  });
};
const _default = SignInView;
