import { compose } from '../utils';
import withUser from './with-user';

const page = compose(withUser);

export default page;
