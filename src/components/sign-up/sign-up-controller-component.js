/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import SignUpView from './sign-up-view-component';

export const AuthStatuses = {
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
  authStatus: initialAuthStatus = AuthStatuses.SignedOut,
  connect,
  ErrorComponent,
  FormComponent,
  LoadingComponent,
  onSuccess = onSuccessDefault,
  SuccessComponent,
  usernamePlaceholder = 'kendrick-lamar-fan-2001',
  ViewComponent = SignUpView,
} = {}) => {
  const [state, setState] = useState({
    authStatus: initialAuthStatus,
    email: '',
    errors: [],
    username: '',
  });
  const { authStatus, email, errors, username } = state;

  const { signUp, handleSignUpErrors, signOut } = connect;

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

  const setErrorAndSignOut = (error) => {
    console.log(error);
    setErrorMessage(error.message);
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
      await signUp({ username })
        .then(handleSignUpSuccess)
        .catch(
          handleSignUpErrors({
            /*
             * All causes prefixed with "Auth" are handled by the
             * built-in authentication flow, so all you need to do
             * in most cases is reset the state.
             */

            // An error was encountered during the authentication flow.
            AuthInternalError: setSignedOut,
            AuthInvalidEmail: setSignedOut,
            AuthLinkExpired: setSignedOut,

            /*
             * User requested to edit their email address during
             * the authentication flow.
             */
            AuthUserRequestEditEmail: setSignedOut,

            /*
             * In this case, the user intentionally rejected email sharing
             * in the authentication flow. If you need their email, you
             * should explain why you need it and ask them to try again.
             */
            AuthUserRejectedConsentToShareEmail: setErrorAndSignOut,

            // The account already exists in Greenruhm.
            AccountAlreadyExists: setErrorAndSignOut,

            // The user did not supply an email address.
            EmailIsRequired: setErrorAndSignOut,

            // The user did not supply a valid email address.
            InvalidEmail: setErrorAndSignOut,

            // The user did not supply a username.
            UsernameIsRequired: setErrorAndSignOut,

            // The user did not supply a valid username.
            InvalidUsername: setErrorAndSignOut,

            // The user provided a username that is already taken.
            UsernameIsUnavailable: setErrorAndSignOut,

            // An unknown error occurred signing up the user with Greenruhm.
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

  const props = {
    authStatus,
    AuthStatuses,
    clearErrors,
    disabled,
    email,
    errors,
    ErrorComponent,
    FormComponent,
    handleUsername,
    handleSignUp,
    handleSignOut,
    LoadingComponent,
    SuccessComponent,
    username,
    usernamePlaceholder,
  };

  return <ViewComponent {...props} />;
};

export default SignUpController;
