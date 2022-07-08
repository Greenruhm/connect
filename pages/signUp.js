import React, { useState } from 'react';

import connect from '../src/index';
const { signUp } = connect({ apiKey: 'test_success' });

export default () => {
  const [state, setState] = useState({
    email: ''
  });

  const handleEmail = e => {
    setState(state => ({
      ...state,
      email: e.target.value
    }));
  };
  const handleSignUp = () => {
    signUp({ email: state.email });
  };

  return (
    <>
      <label>
        Email:
        <input onChange={handleEmail}></input>
      </label>
      <button onClick={handleSignUp}>Sign Up</button>
    </>
  );
};
