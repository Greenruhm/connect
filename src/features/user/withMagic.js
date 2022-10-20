import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import { ethers } from 'ethers';

// https://magic.link/docs/auth/api-reference/client-side-sdks/web#errors-warnings
const AuthErrors = {
  // MagicLinkExpired on Magic's side
  AuthLinkExpired: -10001,
  // InvalidParams on Magic's side
  InvalidEmail: -32602,
  InternalError: -32603,
  UserRequestEditEmail: -10005,
};

export const AuthErrorMessages = {
  AuthLinkExpired: 'Auth Link Expired',
  InvalidEmail: 'Invalid Email',
  InternalError: 'Internal Error',
  UserRequestEditEmail: 'User Request Edit Email',
};

export const handleMagicError = (error) => {
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

  // if UserRequestEditEmail
  if (error.code === AuthErrors.UserRequestEditEmail) {
    throw new Error(AuthErrorMessages.UserRequestEditEmail, {
      cause: 'UserRequestEditEmail',
    });
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
export const withMagicConnect = (params) => {
  // TODO: Update key to one owned by Greenruhm
  // current magic connect api key is tied to
  // oliver.day.swe@gmail.com for testing purpose
  const magic = new Magic('pk_live_4AE9F51174C333FF', {
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

export default withMagic;
