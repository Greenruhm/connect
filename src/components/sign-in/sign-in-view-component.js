/* eslint-disable no-unused-vars */
import React from 'react';
import SignInButton from '../shared/submit-button-component';
import SuccessView from '../shared/success-view';
import ErrorModal from '../shared/error-modal';
import withStyleWrapper from '../shared/style-wrapper';
import Loading from '../shared/loading';
import { AuthStatuses } from './sign-in-controller-component';

const styles = {
  a: {
    textDecoration: 'underline',
  },
  h2: {
    fontSize: '32px',
    fontWeight: 'normal',
    lineHeight: '35.2px',
  },
  signUp: {
    marginTop: '2rem',
    opacity: '0.8',
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

const SignInFormView = ({
  clearErrors,
  errors,
  ErrorComponent,
  disabled,
  handleSignIn,
} = {}) => {
  return (
    <>
      <h2 style={styles.h2}>Sign In (connect)</h2>
      <SignInButton
        disabled={disabled}
        label="Sign In"
        name="sign-in"
        onClick={handleSignIn}
      />
      <SignUpLink href="/sign-up" label="Or Sign Up" />
      {errors.length ? (
        <ErrorComponent errorMessage={errors[0]} onClose={clearErrors} />
      ) : null}
    </>
  );
};

const SignInView = ({
  authStatus = AuthStatuses.SignedOut,
  clearErrors = noop,
  disabled = false,
  email = '',
  errors = [],
  ErrorComponent = ErrorModal,
  FormComponent = withStyleWrapper(SignInFormView),
  handleSignIn = noop,
  handleSignOut = noop,
  LoadingComponent = Loading,
  SuccessComponent = SuccessView,
  username = '',
} = {}) => {
  const formProps = {
    clearErrors,
    disabled,
    errors,
    ErrorComponent,
    handleSignIn,
  };
  const successProps = {
    email,
    handleSignOut,
    username,
  };
  return authStatus === AuthStatuses.SignedOut ? (
    <FormComponent {...formProps} />
  ) : authStatus === AuthStatuses.SigningIn ? (
    <LoadingComponent />
  ) : (
    <SuccessComponent {...successProps} />
  );
};

export default SignInView;
