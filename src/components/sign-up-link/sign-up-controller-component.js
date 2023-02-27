/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import { isValidEmail } from '../utils';
import SignUpView from './sign-up-view-component';

export const AuthStatuses = {
  SignedOut: 'Signed Out',
  SigningUp: 'Signing Up',
  SignedIn: 'Signed In',
};

const { signUp, handleSignUpErrors, signOut } = connect({
  apiKey: '<your-api-key>',
});

const SignUpController = ({
  authStatus: initialAuthStatus = AuthStatuses.SignedOut,
} = {}) => {
  const [state, setState] = useState({
    authStatus: initialAuthStatus,
    email: '',
    errors: [],
    username: '',
  });
  const { authStatus, email, errors, username } = state;

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

  const handleEmail = (e) => {
    setState((state) => ({
      ...state,
      email: e.target.value,
    }));
  };

  const handleUsername = (e) => {
    setState((state) => ({
      ...state,
      username: e.target.value,
    }));
  };

  const handleSignUpSuccess = (userData) =>
    setState((state) => ({
      ...state,
      authStatus: AuthStatuses.SignedIn,
      email: userData?.email,
      username: userData?.username,
    }));

  const handleSignUp = async () => {
    try {
      setSigningUp();
      await signUp({ email, username })
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

  const disabled = !isValidEmail(email) || !username;

  return (
    <SignUpView
      authStatus={authStatus}
      clearErrors={clearErrors}
      disabled={disabled}
      email={email}
      errors={errors}
      handleEmail={handleEmail}
      handleSignUp={handleSignUp}
      handleSignOut={handleSignOut}
      handleUsername={handleUsername}
      username={username}
    />
  );
};

export default SignUpController;
