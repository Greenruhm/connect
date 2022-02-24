import { getDrop as getDropApi } from '../../services/greenruhm-api/index.js';

const getDrop = async id => getDropApi(id);

export default getDrop;
