import { describe } from 'riteway';
import { signIn } from './sign-in';
import { signInErrors } from './sign-in-error-causes';

describe('signIn', async (assert) => {
  const description = {
    given: 'missing email',
    should: 'throw an error with email is required cause',
  };

  try {
    await signIn();
  } catch (error) {
    assert({
      ...description,
      actual: error.cause,
      expected: signInErrors.EmailIsRequired,
    });
  }
});
