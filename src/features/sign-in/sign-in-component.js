/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import connect from '../../index';
import InputWithLabel from '../../example-components/input-with-label-component';
import SignInButton from '../../example-components/submit-button-component';

const color = {
  primary: '#0A0C1F',
  secondary: '#5AE6C1',
  button: '#49ECBD',
  buttonDisabled: '#164A48',
};

const { signIn } = connect({ apiKey: '<your-api-key>' });

const SignInPage = () => {
  const [state, setState] = useState({
    authStatus: 'Signed Out',
    email: '',
    errors: [],
  });
  const { errors } = state;

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
      await signIn({ email: state.email, username: state.username });
      setState(state => ({
        ...state,
        authStatus: 'Signed In',
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
        <div className="sign-in-wrapper">
          <h2>Sign In</h2>
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
            loading={state.authStatus === 'Signing In'}
            name="sign-in"
            onClick={handleSignIn}
          />
          <SignUpLink href="/sign-up" label="Or Sign Up" />
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
        .sign-in-wrapper {
          position: relative;
          max-width: 650px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

const SignUpLink = ({ href, label }) => {
  return (
    <>
      <div className="sign-up">
        <a href={href}>{label}</a>
      </div>
      <style jsx>{`
        a {
          text-decoration: underline;
        }
        .sign-up {
          margin-top: 2rem;
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default SignInPage;
