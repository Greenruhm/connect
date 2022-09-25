import { Magic } from 'magic-sdk';

// https://magic.link/docs/auth/api-reference/client-side-sdks/web#errors-warnings
const AuthErrors = {
  // MagicLinkExpired on Magic's side
  AuthLinkExpired: -10001,
  // InvalidParams on Magic's side
  InvalidEmail: -32602,
  InternalError: -32603,
};

export const AuthErrorMessages = {
  AuthLinkExpired: 'Auth Link Expired',
  InvalidEmail: 'Invalid Email',
  InternalError: 'Internal Error',
};

export const handleMagicError = error => {
  // if MagicLinkExpired
  if (error.code === AuthErrors.AuthLinkExpired) {
    throw new Error(AuthErrorMessages.AuthLinkExpired, {
      cause: 'AuthLinkExpired',
    });
  }

  // if InvalidParams
  if (error.code === AuthErrors.InvalidEmail) {
    throw new Error(AuthErrorMessages.InvalidEmail, {
      cause: 'InvalidEmail',
    });
  }

  // if InternalError
  if (error.code === AuthErrors.InternalError) {
    throw new Error(AuthErrorMessages.InternalError, {
      cause: 'InternalError',
    });
  }

  return;
};

const withMagic = params => {
  const options = {
    ...(process?.env?.NODE_ENV === 'test' && { testMode: true }),
  };

  const magic = new Magic('pk_live_8395118919D97400', options);

  return {
    ...params,
    magic,
    handleMagicError,
  };
};

export default withMagic;
