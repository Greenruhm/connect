/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Theme from './theme';

const styles = {
  label: {
    display: 'block',
    fontSize: '18px',
  },
  input: {
    backgroundColor: `${Theme.primary}`,
    borderRadius: '4px',
    border: '1px solid #FFF',
    color: '#FFF',
    display: 'block',
    fontSize: '16px',
    height: '56px',
    margin: '12px 0',
    outline: 'none',
    padding: '16px',
    transition: 'all 0.2s ease-out',
    width: '100%',
  },
  inputFocus: {
    backgroundColor: `${Theme.primary}`,
    borderRadius: '4px',
    border: `1px solid ${Theme.secondary}`,
    color: '#FFF',
    display: 'block',
    fontSize: '16px',
    height: '56px',
    margin: '12px 0',
    outline: 'none',
    padding: '16px',
    transition: 'all 0.2s ease-out',
    width: '100%',
  },
  fieldWrapper: {
    width: '100%',
    transition: 'all 0.2s ease-out',
  },
};

const InputWithLabel = ({
  className,
  inputPlaceholder,
  label,
  name,
  onChange,
  style,
  type,
} = {}) => {
  const [inputStyle, setInputStyle] = useState(styles.input);

  const onFocus = () => setInputStyle(styles.inputFocus);
  const onBlur = () => setInputStyle(styles.input);

  return (
    <>
      <div className={`input-with-label-wrapper ${className}`} style={style}>
        <label htmlFor={name} style={styles.label}>
          {label}
        </label>
        <div className="field-wrapper" style={styles.fieldWrapper}>
          <input
            name={name}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            placeholder={inputPlaceholder}
            required={true}
            style={inputStyle}
            type={type}
          />
        </div>
      </div>
    </>
  );
};

export default InputWithLabel;
