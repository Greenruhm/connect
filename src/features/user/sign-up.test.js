import { describe } from 'riteway';
import { signUp, signUpErrors } from './sign-up';

describe('signUp', async (assert) => {
  {
    const description = {
      given: 'missing email',
      should: 'throw an error with email is required cause',
    };

    try {
      await signUp({ username: 'foo' });
    } catch (error) {
      assert({
        ...description,
        actual: error.cause,
        expected: signUpErrors.EmailIsRequired,
      });
    }
  }

  {
    const description = {
      given: 'missing username',
      should: 'throw an error with username is required cause',
    };

    try {
      await signUp({ email: 'foo@example.com' });
    } catch (error) {
      assert({
        ...description,
        actual: error.cause,
        expected: signUpErrors.UsernameIsRequired,
      });
    }
  }
});
