const {
  reducer: userReducer,
  slice: userSlice,
} = require('../features/user/reducer');
const {
  reducer: apiKeyReducer,
  slice: apiKeySlice,
} = require('../features/api-key/reducer');
const { toComposableReducer, pipe } = require('../utils');

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

const createStore = ({
  middleware = [],
  reducer = combineReducers({
    [userSlice]: userReducer,
    [apiKeySlice]: apiKeyReducer,
  }),
} = {}) => {
  let state;

  const getState = () => state;

  const dispatch = (action) => {
    if (middleware.length > 0) {
      const { state: newState } = pipe(
        ...middleware.map(toComposableReducer),
        toComposableReducer(reducer)
      )({ state, action });
      state = newState;
    } else {
      state = reducer(state, action);
    }
  };

  const addDispatch = (params) => (actionCreator) =>
    dispatch(actionCreator(params));

  dispatch({});

  return {
    getState,
    dispatch,
    addDispatch,
  };
};

module.exports = createStore;
