import { getDrop as getDropApi } from '../../services/greenruhm-api';

const getDrop = async id => {
  const drop = await getDropApi(id);
  return drop;
};

export default getDrop;
