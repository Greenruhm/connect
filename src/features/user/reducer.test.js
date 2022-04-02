import riteway from 'riteway';
const { describe } = riteway;
import { reducer, initialState } from './reducer.js';

describe('reducer()', async assert => {
  assert({
    given: 'no arguments',
    should: 'return initialstate',
    actual: reducer(),
    expected: initialState
  });
});
