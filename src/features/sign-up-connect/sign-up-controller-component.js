/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../..';
import SignUpView from './sign-up-view-component';

// TODO: Update by using error-causes package
const errorsHandledByConnect = [
  'Auth Link Expired',
  'Invalid Email',
  'Internal Error',
  'User Request Edit Email',
];

// consider if these should be name differently
const { signUpThroughMagicConnect, signOutThroughMagicConnect } = connect({
  apiKey: '<your-api-key>',
});

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
      const userData = await signUpThroughMagicConnect({ username });
      setState((state) => ({
        ...state,
        authStatus: 'Signed Up',
        email: userData?.email,
        username: userData?.username,
      }));
    } catch (e) {
      // if error has NOT already been handled by Connect UI
      if (!errorsHandledByConnect.includes(e.message)) {
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
      await signOutThroughMagicConnect();
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
