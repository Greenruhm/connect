const { Magic } = require('magic-sdk');
const { ConnectExtension } = require('@magic-ext/connect');
const { ethers } = require('ethers');

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

const withMagic = (params) => {
  const options = {
    ...(process?.env?.NODE_ENV === 'test' && { testMode: true }),
  };

  const magic = new Magic('pk_live_8395118919D97400', options);

  return {
    ...params,
    magic,
  };
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

module.exports.withMagic = withMagic;
module.exports.withMagicConnect = withMagicConnect;
module.exports.magicErrorCauses = magicErrorCauses;
