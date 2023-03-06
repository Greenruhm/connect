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
const _signInViewComponent = _interopRequireDefault(
  require('./sign-in-view-component')
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
  SigningIn: 'Signing In',
  SignedIn: 'Signed In',
};
const SignInController = ({
  authStatus: initialAuthStatus = AuthStatuses.SignedOut,
} = {}) => {
  const [state, setState] = (0, _react.useState)({
    authStatus: initialAuthStatus,
    email: '',
    errors: [],
    username: '',
  });
  const { authStatus, email, errors, username } = state;
  const { signIn, handleSignInErrors, signOut } = (0, _.default)({
    apiKey: '<your-api-key>',
    features: ['magic-connect'],
  });
  const setAuthStatus = (authStatus) => () =>
    setState((state) => ({
      ...state,
      authStatus,
    }));
  const setSignedOut = setAuthStatus(AuthStatuses.SignedOut);
  const setSigningIn = setAuthStatus(AuthStatuses.SigningIn);
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
  const handleSignInSuccess = (userData) =>
    setState((state) => ({
      ...state,
      authStatus: AuthStatuses.SignedIn,
      email: userData.email,
      username: userData.username,
    }));
  const handleSignIn = async () => {
    try {
      setSigningIn();
      await signIn()
        .then(handleSignInSuccess)
        .catch(
          handleSignInErrors({
            AuthInternalError: setSignedOut,
            AuthInvalidEmail: setSignedOut,
            AuthLinkExpired: setSignedOut,
            AuthUserRequestEditEmail: setSignedOut,
            AuthUserRejectedConsentToShareEmail: setErrorAndSignOut,
            AccountNotFound: setErrorAndSignOut,
            EmailIsRequired: setErrorAndSignOut,
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
  return (0, _jsxRuntime.jsx)(_signInViewComponent.default, {
    authStatus: authStatus,
    clearErrors: clearErrors,
    email: email,
    errors: errors,
    handleSignIn: handleSignIn,
    handleSignOut: handleSignOut,
    username: username,
  });
};
const _default = SignInController;
