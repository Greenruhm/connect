import React, { useState } from 'react';

import connect from '../src/index';
const { signUp } = connect({ apiKey: 'test_success' });

export default () => {
  const [state, setState] = useState({
    email: '',
    errors: []
  });
  const { errors } = state;

  const handleEmail = e => {
    setState(state => ({
      ...state,
      email: e.target.value
    }));
  };

  const handleUsername = e => {
    setState(state => ({
      ...state,
      username: e.target.value
    }));
  };

  const handleSignUp = async () => {
    try {
      await signUp({ email: state.email, username: state.username });
    } catch (e) {
      // TODO: Oliver | Remove
      console.log({ signUpError: e });
      // TODO: Oliver | Remove
      setState(state => ({
        ...state,
        errors: [...state.errors, e.message]
      }));
    }
  };

  return (
    <>
      {errors.length ? (
        <ul className="errors">
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
      <label>
        Email:
        <input onChange={handleEmail}></input>
      </label>
      <label>
        Username:
        <input onChange={handleUsername}></input>
      </label>
      <button onClick={handleSignUp}>Sign Up</button>
    </>
  );
};
