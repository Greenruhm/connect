const isServer = typeof window === 'undefined';

const getStore = () => {
  if (isServer) return undefined;

  const userData = localStorage.getItem('store');
  return userData ? JSON.parse(userData) : undefined;
};

const setStore = (state) => {
  if (isServer) return;

  localStorage.setItem('store', JSON.stringify(state));
};

const persistStore = (state) => {
  setStore(state);
  return state;
};

exports.getStore = getStore;
exports.persistStore = persistStore;
