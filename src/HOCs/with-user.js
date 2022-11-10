import store from '../reducer/store';
import { selectUser } from '../features/user/reducer';

// eslint-disable-next-line no-unused-vars
const withUser = (Component) => {
  const user = selectUser(store.getState());

  return function WithUser(props) {
    return <Component user={user} {...props} />;
  };
};

export default withUser;
