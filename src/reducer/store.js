const {
  reducer: userReducer,
  slice: userSlice,
} = require('../features/user/reducer');
const {
  reducer: apiKeyReducer,
  slice: apiKeySlice,
} = require('../features/apiKey/reducer');

const createStore = (reducer) => {
  let state;

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
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

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
const reducer = combineReducers({
  [userSlice]: userReducer,
  [apiKeySlice]: apiKeyReducer,
});
const store = createStore(reducer);

module.exports = store;
