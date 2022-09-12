/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import InputWithLabel from '../../example-components/input-with-label-component';
import SignUpButton from '../../example-components/submit-button-component';
import SuccessView from '../../example-components/success-view-component';

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

const renderErrorView = ({ errors } = {}) => {
  return (
    <>
      {errors.length ? (
        <>
          <p>{'Error(s):'}</p>
          <ul className="errors">
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
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
  email,
  handleEmail,
  handleSignUp,
  handleUsername,
  username,
} = {}) =>
  authStatus === 'Signed Out' || authStatus === 'Signing Up'
    ? SignUpView({
        authStatus,
        handleEmail,
        handleSignUp,
        handleUsername,
      })
    : SuccessView({
        email,
        successMessage: 'Your Greenruhm account has been created! 🎉',
        username,
      });

const { signUp } = connect({ apiKey: '<your-api-key>' });

const SignUpPage = ({ authStatus: initialAuthStatus = 'Signed Out' }) => {
  const [state, setState] = useState({
    authStatus: initialAuthStatus,
    email: '',
    errors: [],
    username: '',
  });
  const { authStatus, email, errors, username } = state;

  const handleEmail = e => {
    setState(state => ({
      ...state,
      email: e.target.value,
    }));
  };

  const handleUsername = e => {
    setState(state => ({
      ...state,
      username: e.target.value,
    }));
  };

  const handleSignUp = async () => {
    try {
      setState(state => ({
        ...state,
        authStatus: 'Signing Up',
      }));
      await signUp({ email, username });
      setState(state => ({
        ...state,
        authStatus: 'Signed Up',
      }));
    } catch (e) {
      setState(state => ({
        ...state,
        errors: [...state.errors, e.message],
      }));
      setState(state => ({
        ...state,
        authStatus: 'Signed Out',
      }));
    }
  };

  return (
    <div className="box-format font-format" style={styles.page}>
      <div className="sign-up-wrapper" style={styles.wrapper}>
        {errors.length
          ? renderErrorView({ errors })
          : renderView({
              authStatus,
              email,
              handleEmail,
              handleSignUp,
              handleUsername,
              username,
            })}
      </div>
    </div>
  );
};

export default SignUpPage;
