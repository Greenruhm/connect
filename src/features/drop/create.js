import { createDrop as createDropApi } from '../../services/greenruhm-api/index.js';
import { getUserName } from '../user/reducer';
import { addMedia } from './add-media';

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

export default createDrop;
