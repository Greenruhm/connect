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
const _inputWithLabelComponent = _interopRequireDefault(
  require('../shared/input-with-label-component')
);
const _submitButtonComponent = _interopRequireDefault(
  require('../shared/submit-button-component')
);
const _successView = _interopRequireDefault(require('../shared/success-view'));
const _errorModal = _interopRequireDefault(require('../shared/error-modal'));
const _signUpControllerComponent = require('./sign-up-controller-component');
const _loading = _interopRequireDefault(require('../shared/loading'));
const _withLayout = _interopRequireDefault(require('../shared/with-layout'));
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
  signIn: {
    marginTop: '2rem',
    opacity: '0.8',
  },
  username: {
    marginTop: '2rem',
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: '650px',
    position: 'relative',
  },
};
const noop = () => {};
const SignInLink = ({ href, label } = {}) => {
  return (0, _jsxRuntime.jsx)('div', {
    className: 'sign-in',
    style: styles.signIn,
    children: (0, _jsxRuntime.jsx)('a', {
      href: href,
      style: styles.a,
      children: label,
    }),
  });
};
const SignUpFormView = ({
  authStatus,
  defaultUsername,
  disabled,
  handleSignUp,
  handleUsername,
  usernamePlaceholder,
} = {}) => {
  return (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [
      (0, _jsxRuntime.jsx)('h2', {
        style: styles.h2,
        children: 'Sign Up (connect)',
      }),
      (0, _jsxRuntime.jsx)(_inputWithLabelComponent.default, {
        className: 'username',
        defaultValue: defaultUsername,
        inputPlaceholder: usernamePlaceholder,
        label: 'Username',
        name: 'username',
        onChange: handleUsername,
        style: styles.username,
        type: 'text',
      }),
      (0, _jsxRuntime.jsx)(_submitButtonComponent.default, {
        disabled: disabled,
        label: 'Sign Up',
        loading:
          authStatus === _signUpControllerComponent.AuthStatuses.SigningUp,
        name: 'sign-up',
        onClick: handleSignUp,
      }),
      (0, _jsxRuntime.jsx)(SignInLink, {
        href: '/sign-in-connect',
        label: 'Or Sign In',
      }),
    ],
  });
};
const SignUpFormComponent = (0, _withLayout.default)(SignUpFormView);
const SignUpView = ({
  authStatus = _signUpControllerComponent.AuthStatuses.SignedOut,
  clearErrors = noop,
  disabled = false,
  email = '',
  errors = [],
  ErrorComponent = _errorModal.default,
  FormComponent = SignUpFormComponent,
  handleUsername = noop,
  handleSignUp = noop,
  handleSignOut = noop,
  LoadingComponent = _loading.default,
  SuccessComponent = _successView.default,
  username = '',
  usernamePlaceholder = 'kendrick-lamar-fan-2001',
} = {}) => {
  return errors.length > 0
    ? (0, _jsxRuntime.jsx)(ErrorComponent, {
        errorMessage: errors[0],
        onClose: clearErrors,
      })
    : authStatus === _signUpControllerComponent.AuthStatuses.SignedOut
    ? FormComponent({
        authStatus,
        disabled,
        defaultUsername: username,
        handleSignUp,
        handleUsername,
        usernamePlaceholder,
      })
    : authStatus === _signUpControllerComponent.AuthStatuses.SigningUp
    ? (0, _jsxRuntime.jsx)(LoadingComponent, {})
    : SuccessComponent({
        email,
        handleSignOut,
        successMessage: 'Your Greenruhm account has been created! 🎉',
        username,
      });
};
const _default = SignUpView;
