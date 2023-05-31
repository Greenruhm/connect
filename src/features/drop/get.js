const { getDrop: getDropApi } = require('../../services/greenruhm-api/index.js');
const { addMedia } = require('./add-media');

const getDrop = async ({ dropId }) => {
  const drop = getDropApi(dropId);
  return {
    __proto__: {
      addMedia: addMedia(drop.id)
    },
    ...drop
  };
};

module.exports.getDrop = getDrop;
