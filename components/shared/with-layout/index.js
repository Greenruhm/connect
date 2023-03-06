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
function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      };
}
const styles = {
  page: {
    color: '#fff',
    fontFamily: 'Work Sans, sans-serif',
    margin: '24px auto 0',
    maxWidth: '800px',
    padding: '10px 40px 64px',
    position: 'relative',
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: '650px',
    position: 'relative',
  },
};
const withLayout = (Component) => {
  return function WithLayout(props) {
    return (0, _jsxRuntime.jsx)('div', {
      className: 'box-format font-format',
      style: styles.page,
      children: (0, _jsxRuntime.jsx)('div', {
        className: 'sign-up-wrapper',
        style: styles.wrapper,
        children: (0, _jsxRuntime.jsx)(Component, {
          ...props,
        }),
      }),
    });
  };
};
const _default = withLayout;
