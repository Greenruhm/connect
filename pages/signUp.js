import React, { useState } from 'react';

import connect from '../src/index';

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

  return (
    <>
      <input onChange={handleEmail}></input>
    </>
  );
};
