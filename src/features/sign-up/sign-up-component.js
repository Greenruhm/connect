/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import InputWithLabel from '../../example-components/input-with-label-component';
import SignUpButton from '../../example-components/submit-button-component';

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
  wrapper: {
    margin: '0 auto',
    maxWidth: '650px',
    position: 'relative',
  },
  username: {
    marginTop: '2rem',
  },
};

const { signUp } = connect({ apiKey: '<your-api-key>' });

const SignUpPage = () => {
  const [state, setState] = useState({
    authStatus: 'Signed Out',
    email: '',
    username: '',
    errors: [],
  });
  const { errors } = state;

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
      await signUp({ email: state.email, username: state.username });
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
          loading={state.authStatus === 'Signing Up'}
          name="sign-up"
          onClick={handleSignUp}
        />
        <SignInLink href="/sign-in" label="Or Sign In" />
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
      </div>
    </div>
  );
};

const SignInLink = ({ href, label }) => {
  return (
    <div className="sign-in" style={styles.signIn}>
      <a href={href} style={styles.a}>
        {label}
      </a>
    </div>
  );
};

export default SignUpPage;
