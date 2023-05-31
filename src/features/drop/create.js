const { createDrop: createDropApi } = require('../../services/greenruhm-api/index.js');
const { getUserName } = require('../user/reducer');
const { addMedia } = require('./add-media');

const createDrop = async ({
  getState,
  username = getUserName(getState()),
  title,
  description,
  editionLimit
} = {}) => {
  if (title == '') {
    throw new Error('Title Required to Create Drop');
  }
  if (description == '') {
    throw new Error('Description Required to Create Drop');
  }
  const drop = createDropApi({
    username,
    title,
    description,
    editionLimit
  });

  return {
    __proto__: {
      addMedia: addMedia(drop.id)
    },
    ...drop
  };
};

module.exports.createDrop = createDrop;
