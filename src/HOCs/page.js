import { compose } from '../modules/utils';
import withFeatures from './withFeatures';
import initialFeatures from './withFeatures/initialFeatures';

const page = compose(withFeatures({ initialFeatures }));

export default page;
