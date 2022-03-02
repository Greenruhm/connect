import { createDrop as createDropApi } from '../../services/greenruhm-api/index.js';

const createDrop = context => async ({
  username = context?.user?.username,
  title,
  description,
  editionLimit = 0
} = {}) =>
  createDropApi({
    username,
    title,
    description,
    editionLimit
  });

export default createDrop;
