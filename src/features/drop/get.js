const { getDrop: getDropApi } = require('../../services/greenruhm-api');

const getDrop = async id => {
  const drop = await getDropApi(id);
  return drop;
};

module.exports = getDrop;
