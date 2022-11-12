import { describe } from 'riteway';
import {
  reducer,
  initialState,
  setUser,
  createUser,
  setAnonUser,
} from './reducer.js';

describe('User reducer()', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return initialstate',
    actual: reducer(),
    expected: initialState,
  });

  {
    const user = createUser({
      email: 'test@email.com',
      walletAddress: 'test',
      sessionToken: 'test-token',
      isSignedIn: true,
    });
    assert({
      given: 'initial state and setUser action with a user',
      should: 'set the user in state',
      actual: reducer(initialState, setUser(user)),
      expected: user,
    });
  }

  {
    const user = createUser({
      email: 'test@email.com',
      walletAddress: 'test',
      sessionToken: 'test-token',
      isSignedIn: true,
    });
    assert({
      given: 'initial state with a user and setAnonUser aciton',
      should: 'set state back to initial state',
      actual: reducer(user, setAnonUser()),
      expected: initialState,
    });
  }
});
