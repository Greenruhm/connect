'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
function _export(target, all) {
  for (var name in all)
    Object.defineProperty(target, name, {
      enumerable: true,
      get: all[name],
    });
}
_export(exports, {
  AuthStatuses: () => AuthStatuses,
  default: () => _default,
});
const _jsxRuntime = require('react/jsx-runtime');
const _react = _interopRequireWildcard(require('react'));
const _ = _interopRequireDefault(require('../..'));
const _signUpViewComponent = _interopRequireDefault(
  require('./sign-up-view-component')
);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      };
}
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return {
      default: obj,
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
const AuthStatuses = {
  SignedOut: 'Signed Out',
  SigningUp: 'Signing Up',
  SignedIn: 'Signed In',
};
const onSuccessDefault = (props) => {
  console.log(
    'SignUp success! Replace this onSuccess function with a custom implementation.'
  );
  console.log(JSON.stringify(props));
};
const SignUpController = ({
  apiKey = '<your-api-key>',
  authStatus: initialAuthStatus = AuthStatuses.SignedOut,
  ErrorComponent,
  FormComponent,
  LoadingComponent,
  onSuccess = onSuccessDefault,
  SuccessComponent,
  usernamePlaceholder = 'kendrick-lamar-fan-2001',
  ViewComponent = _signUpViewComponent.default,
} = {}) => {
  const [state, setState] = (0, _react.useState)({
    authStatus: initialAuthStatus,
    email: '',
    errors: [],
    username: '',
  });
  const { authStatus, email, errors, username } = state;
  const { signUp, handleSignUpErrors, signOut } = (0, _.default)({
    apiKey,
    features: ['magic-connect'],
  });
  const setAuthStatus = (authStatus) => () =>
    setState((state) => ({
      ...state,
      authStatus,
    }));
  const setSignedOut = setAuthStatus(AuthStatuses.SignedOut);
  const setSigningUp = setAuthStatus(AuthStatuses.SigningUp);
  const setErrorMessage = (message) =>
    setState((state) => ({
      ...state,
      errors: [...state.errors, message],
    }));
  const setErrorAndSignOut = ({ message }) => {
    setErrorMessage(message);
    setSignedOut();
  };
  const clearErrors = (e) => {
    setState((state) => ({
      ...state,
      errors: [],
    }));
  };
  const handleUsername = (event) => {
    setState((state) => ({
      ...state,
      username: event.target.value,
    }));
  };
  const handleSignUpSuccess = (userData) => {
    const props = {
      authStatus: AuthStatuses.SignedIn,
      email: userData?.email,
      username: userData?.username,
    };
    setState((state) => ({
      ...state,
      ...props,
    }));
    onSuccess(props);
  };
  const handleSignUp = async () => {
    try {
      setSigningUp();
      await signUp({
        username,
      })
        .then(handleSignUpSuccess)
        .catch(
          handleSignUpErrors({
            AuthInternalError: setSignedOut,
            AuthInvalidEmail: setSignedOut,
            AuthLinkExpired: setSignedOut,
            AuthUserRequestEditEmail: setSignedOut,
            AuthUserRejectedConsentToShareEmail: setErrorAndSignOut,
            AccountAlreadyExists: setErrorAndSignOut,
            EmailIsRequired: setErrorAndSignOut,
            InvalidEmail: setErrorAndSignOut,
            UsernameIsRequired: setErrorAndSignOut,
            InvalidUsername: setErrorAndSignOut,
            UsernameIsUnavailable: setErrorAndSignOut,
            InternalServerError: setErrorAndSignOut,
          })
        );
    } catch (e) {
      setErrorAndSignOut(e);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      setErrorMessage(e.message);
    }
    setSignedOut();
  };
  const disabled = !username;
  return (0, _jsxRuntime.jsx)(ViewComponent, {
    authStatus: authStatus,
    clearErrors: clearErrors,
    disabled: disabled,
    email: email,
    errors: errors,
    ErrorComponent: ErrorComponent,
    FormComponent: FormComponent,
    handleUsername: handleUsername,
    handleSignUp: handleSignUp,
    handleSignOut: handleSignOut,
    LoadingComponent: LoadingComponent,
    SuccessComponent: SuccessComponent,
    username: username,
    usernamePlaceholder: usernamePlaceholder,
  });
};
const _default = SignUpController;
