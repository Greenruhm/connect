import { describe } from 'riteway';
import { signIn, signInErrors } from './sign-in';

describe('signIn', async (assert) => {
  const description = {
    given: 'missing email',
    should: 'throw an error with email is required cause',
  };

  try {
    await signIn({ signInErrors });
  } catch (error) {
    assert({
      ...description,
      actual: error.cause,
      expected: signInErrors.EmailIsRequired,
    });
  }
});
