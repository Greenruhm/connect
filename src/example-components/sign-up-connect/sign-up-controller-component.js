/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../..';
import SignUpView from './sign-up-view-component';

// TODO: Update by using error-causes package
const errorsHandledByConnect = [-10001, -32602, -32603, -10005];

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

  const { signUp, signOut } = connect({
    apiKey: '<your-api-key>',
    features: ['magic-connect'],
  });

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

  const handleSignUp = async () => {
    try {
      setState((state) => ({
        ...state,
        authStatus: 'Signing Up',
      }));
      const userData = await signUp({ username });
      setState((state) => ({
        ...state,
        authStatus: 'Signed Up',
        email: userData?.email,
        username: userData?.username,
      }));
    } catch (e) {
      // if error has NOT already been handled by Connect UI
      if (!errorsHandledByConnect.includes(e?.cause?.code)) {
        setState((state) => ({
          ...state,
          errors: [...state.errors, e.message],
        }));
      }
      setState((state) => ({
        ...state,
        authStatus: 'Signed Out',
      }));
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      setState((state) => ({
        ...state,
        errors: [...state.errors, e.message],
      }));
    }
    setState((state) => ({
      ...state,
      authStatus: 'Signed Out',
    }));
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
