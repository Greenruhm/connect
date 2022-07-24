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

  const getState = () => state;

  const dispatch = action => {
    console.log('Dispatching action: ', action, 'Previous state: ', state);
    state = reducer(state, action);
    console.log('New state:', state);
  };

  const addDispatch = params => actionCreator =>
    dispatch(actionCreator(params));

  dispatch({});

  return {
    getState,
    dispatch,
    addDispatch
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
