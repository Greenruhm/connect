const { Magic } = require('magic-sdk');
const { ConnectExtension } = require('@magic-ext/connect');
const { ethers } = require('ethers');
const { createError, errorCauses } = require('error-causes');

const AuthErrorMessages = {
  AuthLinkExpired: 'Auth Link Expired',
  InvalidEmail: 'Invalid Email',
  InternalError: 'Internal Error',
  UserRequestEditEmail: 'User Request Edit Email',
};

// https://magic.link/docs/auth/api-reference/client-side-sdks/web#errors-warnings
// eslint-disable-next-line no-unused-vars
const [magicErrors, handleMagicErrors] = errorCauses({
  AuthLinkExpired: {
    code: -10001,
    message: 'Auth Link Expired',
  },
  InvalidEmail: {
    code: -32602,
    message: 'Invalid Email',
  },
  InternalError: {
    code: -32603,
    message: 'Internal Error',
  },
  UserRequestEditEmail: {
    code: -10005,
    message: 'User Request Edit Email',
  },
});

const handleMagicError = (error) => {
  // if MagicLinkExpired
  if (error.code === magicErrors.AuthLinkExpired.code) {
    throw createError(magicErrors.AuthLinkExpired);
  }

  // if InvalidParams
  if (error.code === magicErrors.InvalidEmail.code) {
    throw createError(magicErrors.InvalidEmail);
  }

  // if InternalError
  if (error.code === magicErrors.InternalError.code) {
    throw createError(magicErrors.InternalError);
  }

  // if UserRequestEditEmail
  if (error.code === magicErrors.UserRequestEditEmail.code) {
    throw createError(magicErrors.UserRequestEditEmail);
  }

  return;
};

const withMagic = (params) => {
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

// TODO: Oliver remove scratch work
const withMagicConnect = (params) => {
  const magic = new Magic('pk_live_BDB8311A26CF3651', {
    extensions: [new ConnectExtension()],
    network: 'mainnet',
  });

  const web3Provider = new ethers.providers.Web3Provider(magic.rpcProvider);

  return {
    ...params,
    handleMagicError,
    magic,
    web3Provider,
  };
};

module.exports.withMagic = withMagic;
module.exports.withMagicConnect = withMagicConnect;
module.exports.magicErrors = magicErrors;
module.exports.handleMagicErrors = handleMagicErrors;
module.exports.handleMagicError = handleMagicError;
module.exports.errorsHandledByConnect = magicErrors;
module.exports.AuthErrorMessages = AuthErrorMessages;
