/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../..';
import SignInView from './sign-in-view-component';

// https://connect.greenruhm.com/fundamentals/user-accounts#sign-in
const errorsHandledByConnect = [
  'Auth Link Expired',
  'Invalid Email',
  'Internal Error',
  'User Request Edit Email',
];

const { signInThroughMagicConnect, signOutThroughMagicConnect } = connect({
  apiKey: '<your-api-key>',
});

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

  const clearErrors = (e) => {
    setState((state) => ({
      ...state,
      errors: [],
    }));
  };

  const handleSignIn = async () => {
    try {
      setState((state) => ({
        ...state,
        authStatus: 'Signing In',
      }));
      const userData = await signInThroughMagicConnect();
      setState((state) => ({
        ...state,
        authStatus: 'Signed In',
        email: userData.email,
        username: userData.username,
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
