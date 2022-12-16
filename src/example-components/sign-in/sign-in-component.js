/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import { isValidEmail } from '../utils';
import InputWithLabel from '../shared/input-with-label-component';
import SignInButton from '../shared/submit-button-component';
import SuccessView from '../shared/success-view';
import ErrorModal from '../shared/error-modal';

const AuthStatuses = {
  SignedOut: 'Signed Out',
  SigningIn: 'Signing In',
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
        loading={authStatus === AuthStatuses.SigningIn}
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
  authStatus === AuthStatuses.SignedOut || authStatus === AuthStatuses.SigningIn
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
