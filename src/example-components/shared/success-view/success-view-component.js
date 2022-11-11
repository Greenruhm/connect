/* eslint-disable no-unused-vars */
import React from 'react';
import Theme from '../../theme';
import SignOutButton from '../submit-button-component';

const styles = {
  divider: {
    borderBottom: `2px solid ${Theme.button}`,
  },
  h2: {
    fontSize: '32px',
    fontWeight: 'normal',
    lineHeight: '35.2px',
    marginBottom: '8px',
  },
  label: {
    color: `${Theme.button}`,
  },
  fieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '56px',
  },
  fieldValue: {
    fontSize: '24px',
    lineHeight: '28px',
    marginTop: '8px',
  },
  successMessage: {
    fontSize: '18px',
    lineHeight: '27px',
    margin: '24px 0',
  },
};

const noop = () => {};

const Field = ({ className = '', label = '', value = '' } = {}) => {
  return (
    <div className={className}>
      <label style={styles.label}>{label}</label>
      <div style={styles.fieldValue}>{value}</div>
    </div>
  );
};

const SuccessView = ({
  email = '',
  handleSignOut = noop,
  successMessage = '',
  username = '',
} = {}) => {
  return (
    <div className="success-view">
      <h2 style={styles.h2}>Success</h2>
      <div className="title-divider" style={styles.divider}></div>
      <div style={styles.successMessage}>{successMessage}</div>
      <div style={styles.fieldsContainer}>
        <Field className="email" label="Email" value={email} />
        <Field className="username" label="Username" value={username} />
      </div>
      <SignOutButton label="Sign Out" name="sign-out" onClick={handleSignOut} />
    </div>
  );
};

export default SuccessView;
