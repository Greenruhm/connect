const asyncPipe =
  (...fns) =>
  (x) =>
    fns.reduce(async (y, f) => f(await y), x);

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, fn) => fn(y), x);

const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const withSlice = (slice) => (store) => ({ [slice]: store });

const withStore = (store) => async (props) => ({
  ...props,
  dispatch: store.dispatch,
  addDispatch: store.addDispatch,
  getState: store.getState,
});

const toComposableReducer =
  (reducer) =>
  ({ state, action }) => ({ state: reducer(state, action), action });

module.exports.asyncPipe = asyncPipe;
module.exports.pipe = pipe;
module.exports.compose = compose;
module.exports.withSlice = withSlice;
module.exports.withStore = withStore;
module.exports.toComposableReducer = toComposableReducer;
