import {
  reducer as userReducer,
  slice as userSlice
} from '../features/user/reducer';
import {
  reducer as apiKeyReducer,
  slice as apiKeySlice
} from '../features/apiKey/reducer';

const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  dispatch({});

  return {
    getState,
    dispatch
  };
};

const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
const reducer = combineReducers({
  [userSlice]: userReducer,
  [apiKeySlice]: apiKeyReducer
});
const store = createStore(reducer);

export default store;
