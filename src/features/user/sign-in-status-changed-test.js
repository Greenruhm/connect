import { describe } from 'riteway';
import createSignInStatusChanged from './sign-in-status-changed';
import { createUser, reducer, setUser, slice } from './reducer';

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

const createMiddleware = () => {
  function onChangeSignedIn() {
    this.called = true;
  }
  const obj = {
    called: false,
  };

  obj.onChangeSignedIn = createSignInStatusChanged(onChangeSignedIn.bind(obj));

  return obj;
};

describe('sign in status listener middleware', async (assert) => {
  {
    const middleware = createMiddleware();

    let state = { [slice]: reducer() };
    const action = { type: 'foo' };

    middleware.onChangeSignedIn(state, action);
    /**
     * The onChangeSignedIn middleware implementation uses a set timeout
     * to execute the callback after the action has been processed by the
     * reducer. If we do not do something here in the test, the assertion
     * will run before the callback has been executed. This is why there is
     * a `sleep` call in here, which just executes a set timeout.
     */
    await sleep();

    assert({
      given: 'an action that does not change the signed in status',
      should: 'not call the on change signed in function',
      expected: false,
      actual: middleware.called,
    });
  }
  {
    const middleware = createMiddleware();

    const state = { [slice]: reducer() };
    const action = setUser({ isSignedIn: true });

    middleware.onChangeSignedIn(state, action);
    /**
     * The onChangeSignedIn middleware implementation uses a set timeout
     * to execute the callback after the action has been processed by the
     * reducer. If we do not do something here in the test, the assertion
     * will run before the callback has been executed. This is why there is
     * a `sleep` call in here, which just executes a set timeout.
     */
    await sleep();

    assert({
      given: 'an action that does change the signed in status',
      should: 'call the on change signed in function',
      expected: true,
      actual: middleware.called,
    });
  }
  {
    const middleware = createMiddleware();

    const state = { [slice]: reducer(createUser({ isSignedIn: true })) };
    const action = setUser({ isSignedIn: true });

    middleware.onChangeSignedIn(state, action);
    /**
     * The onChangeSignedIn middleware implementation uses a set timeout
     * to execute the callback after the action has been processed by the
     * reducer. If we do not do something here in the test, the assertion
     * will run before the callback has been executed. This is why there is
     * a `sleep` call in here, which just executes a set timeout.
     */
    await sleep();

    assert({
      given: 'an action that does not change the signed in status',
      should: 'not call the on change signed in function',
      expected: false,
      actual: middleware.called,
    });
  }
});
