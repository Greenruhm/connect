import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import { ethers } from 'ethers';

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

export const withMagicConnect = (params) => {
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

export default withMagic;
