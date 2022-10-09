/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Theme from './theme';

const button = {
  backgroundColor: `${Theme.button}`,
  border: '0',
  borderRadius: '4px',
  height: '48px',
  position: 'relative',
  width: '100%',
};

const styles = {
  button,
  buttonDisabled: {
    ...button,
    backgroundColor: `${Theme.buttonDisabled}`,
    color: 'black',
  },
  buttonLabel: {
    fontSize: '18px',
  },
};

const SubmitButton = ({
  disabled = false,
  label,
  loading = false,
  name,
  onClick,
} = {}) => {
  return (
    <button
      disabled={disabled || loading}
      name={name}
      onClick={onClick}
      style={disabled || loading ? styles.buttonDisabled : styles.button}
      type="submit"
    >
      <span className="button-label" style={styles.buttonLabel}>
        {label}
      </span>
    </button>
  );
};

export default SubmitButton;
