const { setAnonUser } = require('./reducer');

const signOutThroughMagicConnect = ({ dispatch, magic } = {}) => {
  console.log('called sign out through magic connect!!!');
  magic.connect.disconnect();
  dispatch(setAnonUser());
};

module.exports.signOutThroughMagicConnect = signOutThroughMagicConnect;
