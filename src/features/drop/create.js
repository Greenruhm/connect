const { createDrop: createDropApi } = require('../../services/greenruhm-api');

const createDrop = async ({
  username,
  title,
  description,
  editionLimit = 0,
} = {}) => {
  const dropData = {
    username,
    title,
    description,
    editionLimit,
  };
  const drop = await createDropApi(dropData);
  return drop;
};

module.exports = createDrop;
