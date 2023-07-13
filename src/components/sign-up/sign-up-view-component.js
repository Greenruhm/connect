/* eslint-disable no-unused-vars */
import React from 'react';
import InputWithLabel from '../shared/input-with-label-component';
import SignUpButton from '../shared/submit-button-component';
import SuccessView from '../shared/success-view';
import ErrorModal from '../shared/error-modal';
import { AuthStatuses } from './sign-up-controller-component';
import Loading from '../shared/loading';
import withStyleWrapper from '../shared/style-wrapper';

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
  clearErrors,
  defaultUsername,
  disabled,
  errors,
  ErrorComponent,
  handleSignUp,
  onChangeUsername,
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
        onChange={onChangeUsername}
        style={styles.username}
        type="text"
      />
      <SignUpButton
        disabled={disabled}
        label="Sign Up"
        name="sign-up"
        onClick={handleSignUp}
      />
      <SignInLink href="/sign-in" label="Or Sign In" />
      {errors.length > 0 ? (
        <ErrorComponent errorMessage={errors[0]} onClose={clearErrors} />
      ) : null}
    </>
  );
};
const SignUpFormComponent = withStyleWrapper(SignUpFormView);

const SignUpView = ({
  authStatus = AuthStatuses.SignedOut,
  clearErrors = noop,
  disabled = false,
  email = '',
  errors = [],
  ErrorComponent = ErrorModal,
  FormComponent = SignUpFormComponent,
  handleSignUp = noop,
  handleSignOut = noop,
  LoadingComponent = Loading,
  onChangeUsername = noop,
  SuccessComponent = SuccessView,
  username = '',
  usernamePlaceholder = 'kendrick-lamar-fan-2001',
} = {}) => {
  const formProps = {
    clearErrors,
    disabled,
    defaultUsername: username,
    errors,
    ErrorComponent,
    handleSignUp,
    onChangeUsername,
    usernamePlaceholder,
  };
  const successProps = {
    email,
    handleSignOut,
    username,
  };
  return authStatus === AuthStatuses.SignedOut ? (
    <FormComponent {...formProps} />
  ) : authStatus === AuthStatuses.SigningUp ? (
    <LoadingComponent />
  ) : (
    <SuccessComponent {...successProps} />
  );
};

export default SignUpView;
