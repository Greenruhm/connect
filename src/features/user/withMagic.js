import { Magic } from 'magic-sdk';

const withMagic = params => {
  const options = {
    ...(process?.env?.NODE_ENV === 'test' && { testMode: true })
  };

  const magic = new Magic('pk_live_8395118919D97400', options);

  return {
    ...params,
    magic
  };
};

export default withMagic;
