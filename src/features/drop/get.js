import { getDrop as getDropApi } from '../../services/greenruhm-api';

const getDrop = async id => getDropApi(id);

export default getDrop;
