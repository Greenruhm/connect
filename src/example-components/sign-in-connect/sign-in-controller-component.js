/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../..';
import SignInView from './sign-in-view-component';

const SignInController = ({
  authStatus: initialAuthStatus = 'Signed Out',
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

  const setAuthStatusToSignedOut = () =>
    setState((state) => ({
      ...state,
      authStatus: 'Signed Out',
    }));

  const setErrorMessage = (message) =>
    setState((state) => ({
      ...state,
      errors: [...state.errors, message],
    }));

  const clearErrors = (e) => {
    setState((state) => ({
      ...state,
      errors: [],
    }));
  };

  const handleSignInSuccess = (userData) =>
    setState((state) => ({
      ...state,
      authStatus: 'Signed In',
      email: userData.email,
      username: userData.username,
    }));

  const handleSignIn = async () => {
    try {
      setState((state) => ({
        ...state,
        authStatus: 'Signing In',
      }));
      await signIn()
        .then(handleSignInSuccess)
        .catch(
          handleSignInErrors({
            AccountNotFound: ({ message }) => {
              setErrorMessage(message);
              setAuthStatusToSignedOut();
            },
            AuthInternalError: () => setAuthStatusToSignedOut(),
            AuthInvalidEmail: () => setAuthStatusToSignedOut(),
            AuthLinkExpired: () => setAuthStatusToSignedOut(),
            AuthUserRequestEditEmail: () => setAuthStatusToSignedOut(),
            AuthUserRejectedConsentToShareEmail: ({ message }) => {
              setErrorMessage(message);
              setAuthStatusToSignedOut();
            },
            EmailIsRequired: ({ message }) => {
              setErrorMessage(message);
              setAuthStatusToSignedOut();
            },
            InternalServerError: ({ message }) => {
              setErrorMessage(message);
              setAuthStatusToSignedOut();
            },
          })
        );
    } catch (e) {
      setErrorMessage(e.message);
      setAuthStatusToSignedOut();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      setErrorMessage(e.message);
    }
    setAuthStatusToSignedOut();
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
