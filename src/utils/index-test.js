import { describe } from 'riteway';

import { toComposableReducer } from './index';

describe('toComposableReducer', async (assert) => {
  const state = { foo: 'foo' };
  const action = { type: 'foo' };
  const reducer = (state) => state;
  const toComposable = toComposableReducer(reducer);

  assert({
    given: 'a reducer function',
    should:
      'return a new function which receives one object argument for state and action',
    expected: { state, action },
    actual: toComposable({ state, action }),
  });
});
