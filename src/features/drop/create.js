import { createDrop as createDropApi } from '../../services/greenruhm-api';

const createDrop = async ({
  username,
  title,
  description,
  editionLimit = 0
} = {}) => {
  const dropData = {
    username,
    title,
    description,
    editionLimit
  };
  const drop = await createDropApi(dropData);
  return drop;
};

export default createDrop;
