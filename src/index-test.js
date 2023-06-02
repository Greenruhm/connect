import { describe } from 'riteway';
import match from 'riteway/match';

import connect from './index';

describe('connect()', async (assert) => {
  const requirement = {
    given: 'no API key',
    should: 'throw',
  };

  try {
    connect();

    assert({
      ...requirement,
      actual: 'no error',
      expected: 'error',
    });
  } catch (e) {
    const message = 'Missing API key';
    const contains = match(e.message);

    assert({
      ...requirement,
      actual: contains(message),
      expected: message,
    });
  }
});
