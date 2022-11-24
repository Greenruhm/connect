import { describe } from 'riteway';
import match from 'riteway/match';
import { signIn } from './sign-in';

describe('signIn', async (assert) => {
  const description = {
    given: 'missing email',
    should: 'throw an error',
  };
  const message = 'Email Required to Sign In User';
  try {
    await signIn();
  } catch (error) {
    const contains = match(error.message);
    assert({
      ...description,
      actual: contains(message),
      expected: message,
    });
  }
});
