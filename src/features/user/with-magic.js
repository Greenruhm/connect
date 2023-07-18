const { Magic } = require('magic-sdk');
const { ConnectExtension } = require('@magic-ext/connect');
const { ethers } = require('ethers');
const { createError } = require('error-causes');

/**
 * For context around Auth related errors reference:
 * https://magic.link/docs/auth/api-reference/client-side-sdks/web#errors-warnings
 */
const magicErrorCauses = {
  AuthInternalError: {
    code: -32603,
    message:
      'There was an unexpected error with auth service. Please try again.',
  },
  AuthInvalidEmail: {
    code: -32602,
    message:
      'An invalid email was provided to auth service. Please provide a valid email.',
  },
  AuthLinkExpired: {
    code: -10001,
    message: 'The auth link expired. Please try again.',
  },
  AuthUserRequestEditEmail: {
    code: -10005,
    message: 'Error with user request to edit auth email. Please try again.',
  },
};

const configureMagicErrorCauses = (errorCauses) => (error) => {
  const actions = {
    [errorCauses.AuthInternalError.code]: () => {
      throw createError(errorCauses.AuthInternalError);
    },
    [errorCauses.AuthInvalidEmail.code]: () => {
      throw createError(errorCauses.AuthInvalidEmail);
    },
    [errorCauses.AuthLinkExpired.code]: () => {
      throw createError(errorCauses.AuthLinkExpired);
    },
    [errorCauses.AuthUserRequestEditEmail.code]: () => {
      throw createError(errorCauses.AuthUserRequestEditEmail);
    },
  };

  if (typeof actions[error.code] !== 'function') {
    throw new Error('Invalid Magic error action!');
  }

  return actions[error.code]();
};

const withMagicConnect = (params) => {
  const magic = new Magic('pk_live_BDB8311A26CF3651', {
    extensions: [new ConnectExtension()],
    network: 'mainnet',
  });

  const web3Provider = new ethers.providers.Web3Provider(magic.rpcProvider);

  return {
    ...params,
    magic,
    web3Provider,
  };
};

module.exports.withMagicConnect = withMagicConnect;
module.exports.magicErrorCauses = magicErrorCauses;
module.exports.configureMagicErrorCauses = configureMagicErrorCauses;
