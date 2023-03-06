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
const input = {
  backgroundColor: `${_theme.default.primary}`,
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
    border: `1px solid ${_theme.default.secondary}`,
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
  const [value, setValue] = (0, _react.useState)(defaultValue);
  const [inputStyle, setInputStyle] = (0, _react.useState)(styles.input);
  const onFocus = () => setInputStyle(styles.inputFocus);
  const onBlur = () => setInputStyle(styles.input);
  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };
  return (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: (0, _jsxRuntime.jsxs)('div', {
      className: `input-with-label-wrapper ${className}`,
      style: style,
      children: [
        (0, _jsxRuntime.jsx)('label', {
          htmlFor: name,
          style: styles.label,
          children: label,
        }),
        (0, _jsxRuntime.jsx)('div', {
          className: 'field-wrapper',
          style: styles.fieldWrapper,
          children: (0, _jsxRuntime.jsx)('input', {
            name: name,
            onBlur: onBlur,
            onFocus: onFocus,
            onChange: handleChange,
            placeholder: inputPlaceholder,
            required: true,
            style: inputStyle,
            type: type,
            value: value,
          }),
        }),
      ],
    }),
  });
};
const _default = InputWithLabel;
