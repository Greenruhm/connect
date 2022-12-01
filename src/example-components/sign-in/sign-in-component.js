/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import { isValidEmail } from '../utils';
import InputWithLabel from '../shared/input-with-label-component';
import SignInButton from '../shared/submit-button-component';
import SuccessView from '../shared/success-view';
import ErrorModal from '../shared/error-modal';

const styles = {
  a: {
    textDecoration: 'underline',
  },
  h2: {
    fontSize: '32px',
    fontWeight: 'normal',
    lineHeight: '35.2px',
  },
  page: {
    color: '#fff',
    fontFamily: 'Work Sans, sans-serif',
    margin: '24px auto 0',
    maxWidth: '800px',
    padding: '10px 40px 64px',
    position: 'relative',
  },
  signUp: {
    marginTop: '2rem',
    opacity: '0.8',
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: '650px',
    position: 'relative',
  },
};

const SignUpLink = ({ href, label }) => {
  return (
    <div className="sign-up" style={styles.signUp}>
      <a href={href} style={styles.a}>
        {label}
      </a>
    </div>
  );
};

const SignInView = ({
  authStatus,
  disabled,
  handleEmail,
  handleSignIn,
} = {}) => {
  return (
    <>
      <h2 style={styles.h2}>Sign In</h2>
      <InputWithLabel
        className="email"
        inputPlaceholder="youremail@example.com"
        label="Your Email"
        name="email"
        onChange={handleEmail}
        type="email"
      />
      <SignInButton
        disabled={disabled}
        label="Sign In"
        loading={authStatus === 'Signing In'}
        name="sign-in"
        onClick={handleSignIn}
      />
      <SignUpLink href="/sign-up" label="Or Sign Up" />
    </>
  );
};

const renderView = ({
  authStatus,
  disabled,
  email,
  handleEmail,
  handleSignIn,
  handleSignOut,
  username,
} = {}) =>
  authStatus === 'Signed Out' || authStatus === 'Signing In'
    ? SignInView({
        authStatus,
        disabled,
        handleEmail,
        handleSignIn,
      })
    : SuccessView({
        email,
        handleSignOut,
        successMessage: `Welcome ${username}. You are signed in! 🎉`,
        username,
      });

const { signIn, handleSignInErrors, signOut } = connect({
  apiKey: '<your-api-key>',
});

const SignInPage = ({ authStatus: initialAuthStatus = 'Signed Out' } = {}) => {
  const [state, setState] = useState({
    authStatus: initialAuthStatus,
    email: '',
    errors: [],
    username: '',
  });
  const { authStatus, email, errors, username } = state;

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

  const handleEmail = (e) => {
    setState((state) => ({
      ...state,
      email: e.target.value,
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
      await signIn({ email, username })
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

  const disabled = !isValidEmail(email);

  return (
    <div className="box-format font-format" style={styles.page}>
      <div className="sign-in-wrapper" style={styles.wrapper}>
        {renderView({
          authStatus,
          disabled,
          email,
          handleEmail,
          handleSignIn,
          handleSignOut,
          username,
        })}
        {errors.length ? (
          <ErrorModal errorMessage={errors[0]} onClose={clearErrors} />
        ) : null}
      </div>
    </div>
  );
};

export default SignInPage;
