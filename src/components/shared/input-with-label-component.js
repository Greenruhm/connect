/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Theme from '../theme';

const input = {
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
};

const styles = {
  label: {
    display: 'block',
    fontSize: '18px',
  },
  input,
  inputFocus: {
    ...input,
    border: `1px solid ${Theme.secondary}`,
  },
  fieldWrapper: {
    width: '100%',
    transition: 'all 0.2s ease-out',
  },
};

const InputWithLabel = ({
  className,
  defaultValue,
  inputPlaceholder,
  label,
  name,
  onChange,
  style,
  type,
} = {}) => {
  const [value, setValue] = useState(defaultValue);
  const [inputStyle, setInputStyle] = useState(styles.input);

  const onFocus = () => setInputStyle(styles.inputFocus);
  const onBlur = () => setInputStyle(styles.input);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };

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
            onChange={handleChange}
            placeholder={inputPlaceholder}
            required={true}
            style={inputStyle}
            type={type}
            value={value}
          />
        </div>
      </div>
    </>
  );
};

export default InputWithLabel;
