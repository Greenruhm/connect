import { describe } from 'riteway';
import match from 'riteway/match';
import { AuthErrorMessages, handleMagicError } from './withMagic';

describe('Handle Magic Error', async assert => {
  {
    const description = {
      given: 'auth link expired',
      should: 'throw an error',
    };
    const magicLinkExpiredError = { code: -10001 };
    const message = AuthErrorMessages.AuthLinkExpired;
    try {
      handleMagicError(magicLinkExpiredError);
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
      given: 'invalid email',
      should: 'throw an error',
    };
    const magicInvalidParamsError = { code: -32602 };
    const message = AuthErrorMessages.InvalidEmail;
    try {
      handleMagicError(magicInvalidParamsError);
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
      given: 'internal error',
      should: 'throw an error',
    };
    const magicInternalError = { code: -32603 };
    const message = AuthErrorMessages.InternalError;
    try {
      handleMagicError(magicInternalError);
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
      given: 'user requests to edit email',
      should: 'throw an error',
    };
    const magicUserRequestEditEmail = { code: -10005 };
    const message = AuthErrorMessages.UserRequestEditEmail;
    try {
      handleMagicError(magicUserRequestEditEmail);
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
