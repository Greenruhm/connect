/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../..';
import SignUpView from './sign-up-view-component';

const SignUpController = ({
  authStatus: initialAuthStatus = 'Signed Out',
} = {}) => {
  const [state, setState] = useState({
    authStatus: initialAuthStatus,
    email: '',
    errors: [],
    username: '',
  });
  const { authStatus, email, errors, username } = state;

  const { signUp, handleSignUpErrors, signOut } = connect({
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

  const handleUsername = (e) => {
    setState((state) => ({
      ...state,
      username: e.target.value,
    }));
  };

  const handleSignUpSuccess = (userData) =>
    setState((state) => ({
      ...state,
      authStatus: 'Signed Up',
      email: userData?.email,
      username: userData?.username,
    }));

  const handleSignUp = async () => {
    try {
      setState((state) => ({
        ...state,
        authStatus: 'Signing Up',
      }));
      await signUp({ username })
        .then(handleSignUpSuccess)
        .catch(
          handleSignUpErrors({
            AccountAlreadyExists: ({ message }) => {
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
            InvalidEmail: ({ message }) => {
              setErrorMessage(message);
              setAuthStatusToSignedOut();
            },
            InvalidUserName: ({ message }) => {
              setErrorMessage(message);
              setAuthStatusToSignedOut();
            },
            UsernameIsUnavailable: ({ message }) => {
              setErrorMessage(message);
              setAuthStatusToSignedOut();
            },
            UsernameIsRequired: ({ message }) => {
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

  const disabled = !username;

  return (
    <SignUpView
      authStatus={authStatus}
      clearErrors={clearErrors}
      disabled={disabled}
      email={email}
      errors={errors}
      handleUsername={handleUsername}
      handleSignUp={handleSignUp}
      handleSignOut={handleSignOut}
      username={username}
    />
  );
};

export default SignUpController;
