/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import { isValidEmail } from '../utils';
import SignInView from './sign-in-view-component';

export const AuthStatuses = {
  SignedOut: 'Signed Out',
  SigningIn: 'Signing In',
  SignedIn: 'Signed In',
};

const { signIn, handleSignInErrors, signOut } = connect({
  apiKey: '<your-api-key>',
});

const SignInPage = ({
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

  const handleEmail = (e) => {
    setState((state) => ({
      ...state,
      email: e.target.value,
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
      await signIn({ email, username })
        .then(handleSignInSuccess)
        .catch(
          handleSignInErrors({
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

            // The account does not exist in Greenruhm.
            AccountNotFound: setErrorAndSignOut,

            // The user did not supply an email address.
            EmailIsRequired: setErrorAndSignOut,

            // An unknown error occurred signing the user into Greenruhm.
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

  const disabled = !isValidEmail(email);

  return (
    <SignInView
      authStatus={authStatus}
      clearErrors={clearErrors}
      disabled={disabled}
      email={email}
      errors={errors}
      handleEmail={handleEmail}
      handleSignIn={handleSignIn}
      handleSignOut={handleSignOut}
      username={username}
    />
  );
};

export default SignInPage;
