/* eslint-disable no-unused-vars */
import React from 'react';
import InputWithLabel from '../shared/input-with-label-component';
import SignUpButton from '../shared/submit-button-component';
import SuccessView from '../shared/success-view';
import ErrorModal from '../shared/error-modal';
import { AuthStatuses } from './sign-up-controller-component';

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

const noop = () => {};

const SignInLink = ({ href, label } = {}) => {
  return (
    <div className="sign-in" style={styles.signIn}>
      <a href={href} style={styles.a}>
        {label}
      </a>
    </div>
  );
};

const SignUpFormView = ({
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
      <SignInLink href="/sign-in-link" label="Or Sign In" />
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
    ? SignUpFormView({
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

const SignUpView = ({
  authStatus = AuthStatuses.SignedOut,
  clearErrors = noop,
  disabled = false,
  email = '',
  errors = [],
  handleEmail = noop,
  handleSignUp = noop,
  handleSignOut = noop,
  handleUsername = noop,
  username = '',
} = {}) => {
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

export default SignUpView;
