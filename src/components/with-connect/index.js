import connect from '../..';

const withConnect =
  ({ apiKey = '', features = [], onChangedSignIn } = {}) =>
  (Component) => {
    return function withConnect(props) {
      const connectSDK = connect({ apiKey, features, onChangedSignIn });

      return <Component connect={connectSDK} {...props} />;
    };
  };

module.exports = withConnect;
