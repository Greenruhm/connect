export const asyncPipe =
  (...fns) =>
  (x) =>
    fns.reduce(async (y, f) => f(await y), x);

export const withSlice = (slice) => (store) => ({ [slice]: store });

export const withStore = (store) => async (props) => ({
  ...props,
  dispatch: store.dispatch,
  addDispatch: store.addDispatch,
  getState: store.getState,
});
