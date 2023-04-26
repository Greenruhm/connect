import { describe } from 'riteway';

import createStore from './store';
import {
  initialState as userInitialState,
  slice as userSlice,
} from '../features/user/reducer';
import {
  initialState as apiKeyInitialState,
  slice as apiKeySlice,
} from '../features/api-key/reducer';

describe('createStore function', async (assert) => {
  {
    const { getState } = createStore();
    assert({
      given: 'a create store function call without arguments',
      should: 'return a function to get the state of the store',
      expected: {
        [userSlice]: userInitialState,
        [apiKeySlice]: apiKeyInitialState,
      },
      actual: getState(),
    });
  }
  {
    let middlewareCalled = false;
    const middleware = (state) => {
      middlewareCalled = true;
      return state;
    };
    const { dispatch } = createStore({
      middleware: [middleware],
      reducer: (state) => state,
    });
    1;
    dispatch({});
    assert({
      given: 'a create store function call with middleware',
      should: 'run the middleware function when dispatching an action',
      expected: true,
      actual: middlewareCalled,
    });
  }
});
