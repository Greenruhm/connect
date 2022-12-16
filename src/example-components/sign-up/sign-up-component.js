/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import { isValidEmail } from '../utils';
import InputWithLabel from '../shared/input-with-label-component';
import SignUpButton from '../shared/submit-button-component';
import SuccessView from '../shared/success-view';
import ErrorModal from '../shared/error-modal';

const AuthStatuses = {
  SignedOut: 'Signed Out',
  SigningUp: 'Signing Up',
  SignedIn: 'Signed In',
};

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
  signIn: {
    marginTop: '2rem',
    opacity: '0.8',
  },
  username: {
    marginTop: '2rem',
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: '650px',
    position: 'relative',
  },
};

const SignInLink = ({ href, label } = {}) => {
  return (
    <div className="sign-in" style={styles.signIn}>
      <a href={href} style={styles.a}>
        {label}
      </a>
    </div>
  );
};

const SignUpView = ({
  authStatus,
  disabled,
  handleEmail,
  handleSignUp,
  handleUsername,
} = {}) => {
  return (
    <>
      <h2 style={styles.h2}>Sign Up</h2>
      <InputWithLabel
        className="email"
        inputPlaceholder="youremail@example.com"
        label="Your Email"
        name="email"
        onChange={handleEmail}
        type="email"
      />
      <InputWithLabel
        className="username"
        inputPlaceholder="kendrick-lamar-fan-2001"
        label="Username"
        name="username"
        onChange={handleUsername}
        style={styles.username}
        type="text"
      />
      <SignUpButton
        disabled={disabled}
        label="Sign Up"
        loading={authStatus === AuthStatuses.SigningUp}
        name="sign-up"
        onClick={handleSignUp}
      />
      <SignInLink href="/sign-in" label="Or Sign In" />
    </>
  );
};

const renderView = ({
  authStatus,
  disabled,
  email,
  handleEmail,
  handleSignUp,
  handleSignOut,
  handleUsername,
  username,
} = {}) =>
  authStatus === AuthStatuses.SignedOut || authStatus === AuthStatuses.SigningUp
    ? SignUpView({
        authStatus,
        disabled,
        handleEmail,
        handleSignUp,
        handleUsername,
      })
    : SuccessView({
        email,
        handleSignOut,
        successMessage: 'Your Greenruhm account has been created! 🎉',
        username,
      });

const { signUp, handleSignUpErrors, signOut } = connect({
  apiKey: '<your-api-key>',
});

const SignUpPage = ({
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
    <div className="box-format font-format" style={styles.page}>
      <div className="sign-up-wrapper" style={styles.wrapper}>
        {renderView({
          authStatus,
          disabled,
          email,
          handleEmail,
          handleSignUp,
          handleSignOut,
          handleUsername,
          username,
        })}
        {errors.length ? (
          <ErrorModal errorMessage={errors[0]} onClose={clearErrors} />
        ) : null}
      </div>
    </div>
  );
};

export default SignUpPage;
