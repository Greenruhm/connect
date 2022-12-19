import { describe } from 'riteway';
import { signUp } from './sign-up';
import { signUpErrors } from './sign-up-error-causes';

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
