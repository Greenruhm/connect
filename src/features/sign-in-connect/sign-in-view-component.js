/* eslint-disable no-unused-vars */
import React from 'react';
import InputWithLabel from '../../example-components/input-with-label-component';
import SignInButton from '../../example-components/submit-button-component';
import SuccessView from '../../example-components/shared/success-view';
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

const noop = () => {};

const SignUpLink = ({ href, label }) => {
  return (
    <div className="sign-up" style={styles.signUp}>
      <a href={href} style={styles.a}>
        {label}
      </a>
    </div>
  );
};

const SignInFormView = ({ authStatus, disabled, handleSignIn } = {}) => {
  return (
    <>
      <h2 style={styles.h2}>Sign In (connect)</h2>
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
  handleSignIn,
  handleSignOut,
  username,
} = {}) =>
  authStatus === 'Signed Out' || authStatus === 'Signing In'
    ? SignInFormView({
        authStatus,
        disabled,
        handleSignIn,
      })
    : SuccessView({
        email,
        handleSignOut,
        successMessage: `Welcome ${username}. You are signed in! 🎉`,
        username,
      });

const SignInView = ({
  authStatus = 'Signed Out',
  clearErrors = noop,
  disabled = false,
  email = '',
  errors = [],
  handleSignIn = noop,
  handleSignOut = noop,
  username = '',
} = {}) => {
  return (
    <div className="box-format font-format" style={styles.page}>
      <div className="sign-in-wrapper" style={styles.wrapper}>
        {renderView({
          authStatus,
          disabled,
          email,
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

export default SignInView;
