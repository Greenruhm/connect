/* eslint-disable no-unused-vars */
import React from 'react';
import InputWithLabel from '../shared/input-with-label-component';
import SignUpButton from '../shared/submit-button-component';
import SuccessView from '../shared/success-view';
import ErrorModal from '../shared/error-modal';
import { AuthStatuses } from './sign-up-controller-component';
import Loading from '../shared/loading';
import withLayout from '../shared/with-layout';

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
  defaultUsername,
  disabled,
  handleSignUp,
  handleUsername,
  usernamePlaceholder,
} = {}) => {
  return (
    <>
      <h2 style={styles.h2}>Sign Up (connect)</h2>
      <InputWithLabel
        className="username"
        defaultValue={defaultUsername}
        inputPlaceholder={usernamePlaceholder}
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
const SignUpFormComponent = withLayout(SignUpFormView);

const SignUpView = ({
  authStatus = AuthStatuses.SignedOut,
  clearErrors = noop,
  disabled = false,
  email = '',
  errors = [],
  ErrorComponent = ErrorModal,
  FormComponent = SignUpFormComponent,
  handleUsername = noop,
  handleSignUp = noop,
  handleSignOut = noop,
  LoadingComponent = Loading,
  SuccessComponent = SuccessView,
  username = '',
  usernamePlaceholder = 'kendrick-lamar-fan-2001',
} = {}) => {
  return errors.length > 0 ? (
    <ErrorComponent errorMessage={errors[0]} onClose={clearErrors} />
  ) : authStatus === AuthStatuses.SignedOut ? (
    FormComponent({
      authStatus,
      disabled,
      defaultUsername: username,
      handleSignUp,
      handleUsername,
      usernamePlaceholder,
    })
  ) : authStatus === AuthStatuses.SigningUp ? (
    <LoadingComponent />
  ) : (
    SuccessComponent({
      email,
      handleSignOut,
      successMessage: 'Your Greenruhm account has been created! 🎉',
      username,
    })
  );
};

export default SignUpView;
