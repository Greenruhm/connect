import { Magic } from 'magic-sdk';

const withMagic = params => {
  // TODO USE ENV
  const magic = new Magic('pk_live_8395118919D97400');
  return {
    ...params,
    magic
  };
};

export default withMagic;
