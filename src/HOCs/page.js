import { compose } from '../modules/utils';
import withFeatures from './with-features';
import initialFeatures from './with-features/initial-features';
import withUser from './with-user';

const page = compose(withUser, withFeatures({ initialFeatures }));

export default page;
