/* eslint-disable no-unused-vars */
import React from 'react';
import InputWithLabel from '../../example-components/input-with-label-component';
import SignUpButton from '../../example-components/submit-button-component';
import SuccessView from '../../example-components/success-view-component';
import ErrorModal from '../../example-components/shared/error-modal';

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
  handleSignUp,
  handleUsername,
} = {}) => {
  return (
    <>
      <h2 style={styles.h2}>Sign Up (connect)</h2>
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
        loading={authStatus === 'Signing Up'}
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
  handleSignUp,
  handleSignOut,
  handleUsername,
  username,
} = {}) =>
  authStatus === 'Signed Out' || authStatus === 'Signing Up'
    ? SignUpFormView({
        authStatus,
        disabled,
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
  authStatus = 'Signed Out',
  clearErrors = noop,
  disabled = false,
  email = '',
  errors = [],
  handleUsername = noop,
  handleSignUp = noop,
  handleSignOut = noop,
  username = '',
} = {}) => {
  return (
    <div className="box-format font-format" style={styles.page}>
      <div className="sign-up-wrapper" style={styles.wrapper}>
        {renderView({
          authStatus,
          disabled,
          email,
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
