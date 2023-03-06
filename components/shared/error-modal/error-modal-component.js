'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: () => _default,
});
const _jsxRuntime = require('react/jsx-runtime');
const _react = _interopRequireDefault(require('react'));
const _theme = _interopRequireDefault(require('../../theme'));
const _submitButtonComponent = _interopRequireDefault(
  require('../submit-button-component')
);
const _withLayout = _interopRequireDefault(require('../with-layout'));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      };
}
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
  background: `${_theme.default.secondary}`,
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
    border: `solid 3px ${_theme.default.button}`,
    backgroundColor: `${_theme.default.primary}`,
    width: '90%',
    maxWidth: '800px',
  },
  divider: {
    borderBottom: `2px solid ${_theme.default.secondary}`,
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
    backgroundColor: `${_theme.default.modalBackground}`,
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
  return (0, _jsxRuntime.jsx)('div', {
    className: 'modal-wrapper',
    style: styles.wrapper,
    onClick: onClose,
    children: (0, _jsxRuntime.jsx)('div', {
      className: 'modal-container',
      style: styles.container,
      children: (0, _jsxRuntime.jsxs)('div', {
        className: 'modal-content',
        style: styles.content,
        children: [
          (0, _jsxRuntime.jsxs)('div', {
            className: 'x-close-wrapper',
            style: styles.xCloseWrapper,
            onClick: onClose,
            children: [
              (0, _jsxRuntime.jsx)('div', {
                className: 'x-line-1',
                style: styles.xLine1,
              }),
              (0, _jsxRuntime.jsx)('div', {
                className: 'x-line-2',
                style: styles.xLine2,
              }),
            ],
          }),
          (0, _jsxRuntime.jsx)('h2', {
            style: styles.h2,
            children: title,
          }),
          (0, _jsxRuntime.jsx)('div', {
            className: 'title-divider',
            style: styles.divider,
          }),
          (0, _jsxRuntime.jsx)('p', {
            className: 'error-message',
            style: styles.errorMessage,
            children: errorMessage,
          }),
          (0, _jsxRuntime.jsx)(_submitButtonComponent.default, {
            label: 'Try Again',
            name: 'try-again',
            onClick: onClose,
          }),
        ],
      }),
    }),
  });
};
const _default = (0, _withLayout.default)(ErrorModal);
