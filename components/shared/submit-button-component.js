'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: () => _default,
});
const _jsxRuntime = require('react/jsx-runtime');
const _react = _interopRequireWildcard(require('react'));
const _theme = _interopRequireDefault(require('../theme'));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      };
}
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return {
      default: obj,
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
const button = {
  backgroundColor: `${_theme.default.button}`,
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
    ..._theme.default.buttonDisabled,
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
  return (0, _jsxRuntime.jsx)('button', {
    disabled: disabled || loading,
    name: name,
    onClick: onClick,
    style: disabled || loading ? styles.buttonDisabled : styles.button,
    type: 'submit',
    children: (0, _jsxRuntime.jsx)('span', {
      className: 'button-label',
      style: styles.buttonLabel,
      children: label,
    }),
  });
};
const _default = SubmitButton;
