import { describe } from 'riteway';
import match from 'riteway/match';
import signIn, { signInErrors } from './sign-in';

describe('signIn', async (assert) => {
  const description = {
    given: 'missing email',
    should: 'throw an error',
  };
  const message = 'Email required to sign in user';
  try {
    await signIn({ signInErrors });
  } catch (error) {
    const contains = match(error.message);
    assert({
      ...description,
      actual: contains(message),
      expected: message,
    });
  }
});
