/* eslint-disable no-unused-vars */
import React from 'react';
import Theme from '../theme';

import Loading from '../loading/index.js';

const wrapperLoadingStyle = {
  position: 'absolute',
  height: 'inherit',
  width: 'inherit',
  top: 0,
  left: '-8px', //Half the size of the logo in small
};

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
    ...Theme.buttonDisabled,
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
  className,
  loadingStyle = {},
} = {}) => {
  return (
    <button
      className={className}
      disabled={disabled || loading}
      name={name}
      onClick={onClick}
      style={disabled || loading ? styles.buttonDisabled : styles.button}
      type="submit"
    >
      {loading ? (
        <Loading small style={{ ...wrapperLoadingStyle, ...loadingStyle }} />
      ) : (
        <span className="button-label" style={styles.buttonLabel}>
          {label}
        </span>
      )}
    </button>
  );
};

export default SubmitButton;
