import { getDrop as getDropApi } from '../../services/greenruhm-api/index.js';
import { addMedia } from './add-media';

const getDrop = async ({ dropId }) => {
  const drop = getDropApi(dropId);
  return {
    __proto__: {
      addMedia: addMedia(drop.id)
    },
    ...drop
  };
};

export default getDrop;
