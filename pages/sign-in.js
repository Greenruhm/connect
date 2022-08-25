import React, { useState } from 'react';

import connect from '../src/index';
const { signIn } = connect({ apiKey: 'test_success' });

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

  const handleSignIn = async () => {
    try {
      await signIn({ email: state.email, username: state.username });
    } catch (e) {
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
      <button onClick={handleSignIn}>Sign In</button>
    </>
  );
};
