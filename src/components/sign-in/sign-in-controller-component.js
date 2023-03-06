/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../..';
import SignInView from './sign-in-view-component';

export const AuthStatuses = {
  SignedOut: 'Signed Out',
  SigningIn: 'Signing In',
  SignedIn: 'Signed In',
};

const SignInController = ({
  authStatus: initialAuthStatus = AuthStatuses.SignedOut,
} = {}) => {
  const [state, setState] = useState({
    authStatus: initialAuthStatus,
    email: '',
    errors: [],
    username: '',
  });
  const { authStatus, email, errors, username } = state;

  const { signIn, handleSignInErrors, signOut } = connect({
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

  return (
    <SignInView
      authStatus={authStatus}
      clearErrors={clearErrors}
      email={email}
      errors={errors}
      handleSignIn={handleSignIn}
      handleSignOut={handleSignOut}
      username={username}
    />
  );
};

export default SignInController;