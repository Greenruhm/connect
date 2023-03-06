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
const _propTypes = require('prop-types');
const _withLayout = _interopRequireDefault(require('../with-layout'));
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
function Loading({ small, ...props }) {
  const wrapperRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    wrapperRef.current.style.opacity = 1;
  }, []);
  return (0, _jsxRuntime.jsxs)('div', {
    ref: wrapperRef,
    className: 'load-spinner wrapper',
    ...props,
    children: [
      (0, _jsxRuntime.jsx)('svg', {
        className: 'circle',
        viewBox: '0 0 100 100',
        children: (0, _jsxRuntime.jsx)('path', {
          fill: '#49ECBD',
          d: 'M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50',
          children: (0, _jsxRuntime.jsx)('animateTransform', {
            attributeName: 'transform',
            attributeType: 'XML',
            type: 'rotate',
            dur: '1s',
            from: '0 50 50',
            to: '360 50 50',
            repeatCount: 'indefinite',
          }),
        }),
      }),
      (0, _jsxRuntime.jsx)('svg', {
        className: 'logo',
        width: '24',
        height: '24',
        viewBox: '0 0 64 64',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        children: (0, _jsxRuntime.jsx)('path', {
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          d: 'M18.4291 57.1043C16.0851 55.8169 13.6599 54.6551 11.4143 53.2144C6.84319 50.2805 4.39236 45.9555 4.09028 40.5979C3.81528 35.7308 3.76042 30.8423 3.8452 25.9666C3.94281 20.345 6.3972 15.8214 11.1321 12.7249C14.4857 10.5326 18.0101 8.6008 21.4591 6.5533C23.5872 5.29073 25.7082 4.01397 27.8505 2.77553C28.5366 2.3788 29.2555 2.00834 30.0043 1.75497C31.9129 1.10914 33.9391 1.85717 34.9173 3.49446C35.9297 5.18924 35.7017 7.24881 34.2177 8.63061C33.4575 9.3389 32.5598 9.91873 31.67 10.4709C26.8851 13.441 22.1139 16.4345 17.2763 19.3181C14.1202 21.1995 12.6661 23.8744 12.7865 27.5024C12.9133 31.3292 12.9909 35.1587 13.0536 38.9876C13.1078 42.3417 14.6082 44.7369 17.5955 46.3111C21.0965 48.1563 24.5633 50.0682 28.003 52.0249C30.9426 53.6977 33.8002 53.6225 36.6557 51.8929C40.0619 49.8291 43.4682 47.7638 46.8651 45.6865C49.5026 44.0741 50.8905 41.7285 50.8648 38.6292C50.8442 35.9628 50.7993 33.2958 50.6831 30.6329C50.5848 28.3675 49.4257 27.7288 47.455 28.8835C43.7011 31.0836 39.9928 33.3632 36.2589 35.5995C35.5521 36.0224 34.8354 36.4405 34.0887 36.7847C31.6821 37.8946 29.2533 37.219 27.9595 35.1169C26.6714 33.0239 27.1331 30.4583 29.2811 28.9417C31.2282 27.567 33.315 26.3853 35.3598 25.1512C40.5215 22.0334 45.6939 18.9341 50.8627 15.8292C51.2524 15.595 51.6428 15.3579 52.0482 15.1521C55.2264 13.534 58.5678 14.9633 59.5596 18.3898C59.7469 19.037 59.8545 19.7276 59.8688 20.4018C59.9984 26.4989 60.1652 32.596 60.1894 38.6938C60.2143 45.1124 57.4023 50.0498 51.9214 53.4159C48.1889 55.709 44.4214 57.9474 40.6219 60.129C36.1848 62.6769 31.4997 63.1943 26.6401 61.4661C25.545 61.0765 24.4935 60.5464 23.4611 60.007C21.7462 59.1092 20.0627 58.1518 18.3657 57.22C18.3863 57.1809 18.4084 57.1426 18.4291 57.1043Z',
          fill: '#49ECBD',
        }),
      }),
      (0, _jsxRuntime.jsx)('style', {
        jsx: true,
        children: `
        div.wrapper {
          display: flex;
          align-items: center;
          opacity: 0;
          transition: opacity 0.15s ease-in;
        }
        svg.circle {
          height: ${small ? '72px' : '120px'};
          width: 100%;
        }
        svg.logo {
          height: ${small ? '16px' : '26px'};
          width: 100%;
          margin-left: -100%;
        }
      `,
      }),
    ],
  });
}
Loading.propTypes = {
  small: _propTypes.bool,
  style: _propTypes.object,
};
const _default = (0, _withLayout.default)(Loading);
