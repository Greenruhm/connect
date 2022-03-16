import { createDrop as createDropApi } from '../../services/greenruhm-api/index.js';
import { getUserName } from '../user/reducer';

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
  return createDropApi({
    username,
    title,
    description,
    editionLimit
  });
};

export default createDrop;
