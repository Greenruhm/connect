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
const styles = {
  divider: {
    borderBottom: `2px solid ${_theme.default.button}`,
  },
  h2: {
    fontSize: '32px',
    fontWeight: 'normal',
    lineHeight: '35.2px',
    marginBottom: '8px',
  },
  label: {
    color: `${_theme.default.button}`,
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
  return (0, _jsxRuntime.jsxs)('div', {
    className: className,
    children: [
      (0, _jsxRuntime.jsx)('label', {
        style: styles.label,
        children: label,
      }),
      (0, _jsxRuntime.jsx)('div', {
        style: styles.fieldValue,
        children: value,
      }),
    ],
  });
};
const SuccessView = ({
  email = '',
  handleSignOut = noop,
  successMessage = '',
  username = '',
} = {}) => {
  return (0, _jsxRuntime.jsxs)('div', {
    className: 'success-view',
    children: [
      (0, _jsxRuntime.jsx)('h2', {
        style: styles.h2,
        children: 'Success',
      }),
      (0, _jsxRuntime.jsx)('div', {
        className: 'title-divider',
        style: styles.divider,
      }),
      (0, _jsxRuntime.jsx)('div', {
        style: styles.successMessage,
        children: successMessage,
      }),
      (0, _jsxRuntime.jsxs)('div', {
        style: styles.fieldsContainer,
        children: [
          (0, _jsxRuntime.jsx)(Field, {
            className: 'email',
            label: 'Email',
            value: email,
          }),
          (0, _jsxRuntime.jsx)(Field, {
            className: 'username',
            label: 'Username',
            value: username,
          }),
        ],
      }),
      (0, _jsxRuntime.jsx)(_submitButtonComponent.default, {
        label: 'Sign Out',
        name: 'sign-out',
        onClick: handleSignOut,
      }),
    ],
  });
};
const _default = (0, _withLayout.default)(SuccessView);
