/* eslint-disable no-unused-vars */
import React from 'react';
import Theme from '../../theme';
import TryAgainButton from '../submit-button-component';

const centered = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
};

const xLine = {
  position: 'absolute',
  height: '100%',
  width: '2px',
  background: `${Theme.secondary}`,
};

const styles = {
  buttonContainer: {
    marginTop: '16px',
  },
  container: {
    ...centered,
    width: '100%',
    height: '100%',
  },
  content: {
    ...centered,
    padding: '20px',
    borderRadius: '32px',
    border: `solid 3px ${Theme.button}`,
    backgroundColor: `${Theme.primary}`,
    width: '90%',
    maxWidth: '800px',
  },
  divider: {
    borderBottom: `2px solid ${Theme.secondary}`,
    marginBottom: '8px',
    width: '100%',
  },
  errorMessage: {
    fontSize: '18px',
    lineHeight: '27px',
    marginTop: '18px',
    marginBottom: '32px',
    textAlign: 'center',
  },
  h2: {
    fontSize: '32px',
    fontWeight: 'normal',
    lineHeight: '35.2px',
    marginBottom: '8px',
    marginTop: '32px',
  },
  wrapper: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: `${Theme.modalBackground}`,
    zIndex: '999',
  },
  xCloseWrapper: {
    position: 'absolute',
    right: '25px',
    top: '25px',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  xLine1: {
    ...xLine,
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
  },
  xLine2: {
    ...xLine,
    left: '50%',
    transform: 'translateX(-50%) rotate(-45deg)',
  },
};

const noop = () => {};

const ErrorModal = ({
  errorMessage = 'An error has occurred.',
  title = 'Error!',
  onClose = noop,
} = {}) => {
  return (
    <div className="modal-wrapper" style={styles.wrapper} onClick={onClose}>
      <div className="modal-container" style={styles.container}>
        <div className="modal-content" style={styles.content}>
          <div
            className="x-close-wrapper"
            style={styles.xCloseWrapper}
            onClick={onClose}
          >
            <div className="x-line-1" style={styles.xLine1}></div>
            <div className="x-line-2" style={styles.xLine2}></div>
          </div>
          <h2 style={styles.h2}>{title}</h2>
          <div className="title-divider" style={styles.divider}></div>
          <p className="error-message" style={styles.errorMessage}>
            {errorMessage}
          </p>
          <TryAgainButton
            label="Try Again"
            name="try-again"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
