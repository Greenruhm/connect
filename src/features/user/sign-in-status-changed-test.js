import { describe } from 'riteway';
import createSignInStatusChanged from './sign-in-status-changed';
import { initialState, setUser, slice } from './reducer';

describe('sign in status listener middleware', async (assert) => {
  let signedIn = false;
  const onChangeSignedIn = () => {
    signedIn = !signedIn;
  };

  {
    let state = { [slice]: initialState };
    const action = { type: 'foo' };

    const signInStatusListener = createSignInStatusChanged(onChangeSignedIn);

    signInStatusListener(state, action);
    assert({
      given: 'an action that does not change the signed in status',
      should: 'not call the on change signed in function',
      expected: false,
      actual: signedIn,
    });

    signInStatusListener(state, setUser({ isSignedIn: true }));
    state = { [slice]: { ...initialState, isSignedIn: true } };
    assert({
      given: 'an action that does change the signed in status',
      should: 'call the on change signed in function',
      expected: true,
      actual: signedIn,
    });

    signInStatusListener(state, setUser({ isSignedIn: true }));
    assert({
      given: 'an action that does not change the signed in status',
      should: 'not call the on change signed in function',
      expected: true,
      actual: signedIn,
    });
  }
});
