import { getDrop as getDropApi } from '../../services/greenruhm-api/index.js';

const getDrop = async ({ dropId }) => getDropApi(dropId);

export default getDrop;
