/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import InputWithLabel from '../../example-components/input-with-label-component';
import SignInButton from '../../example-components/submit-button-component';
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

const SignUpLink = ({ href, label }) => {
  return (
    <div className="sign-up" style={styles.signUp}>
      <a href={href} style={styles.a}>
        {label}
      </a>
    </div>
  );
};

const SignInView = ({ authStatus, handleEmail, handleSignIn } = {}) => {
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
  email,
  handleEmail,
  handleSignIn,
  username,
} = {}) =>
  authStatus === 'Signed Out' || authStatus === 'Signing In'
    ? SignInView({
        authStatus,
        handleEmail,
        handleSignIn,
      })
    : SuccessView({
        email,
        successMessage: `Welcome ${username}. You are signed in! 🎉`,
        username,
      });

const { signIn } = connect({ apiKey: '<your-api-key>' });

const SignInPage = ({ authStatus: initialAuthStatus = 'Signed Out' } = {}) => {
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

  const handleSignIn = async () => {
    try {
      setState(state => ({
        ...state,
        authStatus: 'Signing In',
      }));
      const userData = await signIn({ email, username });
      setState(state => ({
        ...state,
        authStatus: 'Signed In',
        email: userData.email,
        username: userData.username,
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
      <div className="sign-in-wrapper" style={styles.wrapper}>
        {errors.length
          ? renderErrorView({ errors })
          : renderView({
              authStatus,
              email,
              handleEmail,
              handleSignIn,
              username,
            })}
      </div>
    </div>
  );
};

export default SignInPage;
