import { createDrop as createDropApi } from '../../services/greenruhm-api';

const createDrop = async ({
  username,
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
