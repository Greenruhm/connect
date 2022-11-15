import { describe } from 'riteway';
import match from 'riteway/match';

import signUp, { signUpErrors } from './sign-up';

describe('signUp', async (assert) => {
  {
    const description = {
      given: 'missing email',
      should: 'throw an error',
    };
    const message = 'Email is required.';
    try {
      await signUp({ username: 'foo', signUpErrors });
    } catch (error) {
      const contains = match(error.message);

      assert({
        ...description,
        actual: contains(message),
        expected: message,
      });
    }
  }

  {
    const description = {
      given: 'missing username',
      should: 'throw an error',
    };

    const message = 'Username is required.';

    try {
      await signUp({ email: 'foo@example.com', signUpErrors });
    } catch (error) {
      const contains = match(error.message);

      assert({
        ...description,
        actual: contains(message),
        expected: message,
      });
    }
  }
});
