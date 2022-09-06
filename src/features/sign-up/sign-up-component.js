/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import InputWithLabel from '../../example-components/input-with-label-component';

const color = {
  primary: '#0A0C1F',
  secondary: '#5AE6C1',
  button: '#49ECBD',
  buttonDisabled: '#164A48',
};

const styles = {
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
    <>
      <div className="box-format font-format">
        <div className="sign-up-wrapper">
          <h2>Sign Up</h2>
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
      <style jsx>{`
        h2 {
          font-size: 32px;
          line-height: 35.2px;
          font-weight: normal;
        }
        .box-format {
          position: relative;
          max-width: 800px;
          padding: 10px 40px 64px;
          margin: 24px auto 0;
        }
        .font-format {
          color: #fff;
          font-family: 'Work Sans', sans-serif;
        }
        .sign-up-wrapper {
          position: relative;
          max-width: 650px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

const SignUpButton = ({
  disabled = false,
  label,
  loading = false,
  name,
  onClick,
} = {}) => {
  return (
    <>
      <button
        disabled={disabled || loading}
        name={name}
        onClick={onClick}
        type="submit"
      >
        <span className="button-label">{label}</span>
      </button>
      <style jsx>{`
        button {
          background-color: ${color.button};
          border-radius: 4px;
          border: 0;
          height: 48px;
          position: relative;
          width: 100%;
        }
        button[disabled] {
          background-color: ${color.buttonDisabled};
        }
        .button-label {
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

const SignInLink = ({ href, label }) => {
  return (
    <>
      <div className="sign-in">
        <a href={href}>{label}</a>
      </div>
      <style jsx>{`
        a {
          text-decoration: underline;
        }
        .sign-in {
          margin-top: 2rem;
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default SignUpPage;
