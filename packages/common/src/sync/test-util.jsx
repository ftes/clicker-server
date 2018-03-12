import { combineReducers, createStore, applyMiddleware } from 'redux';

import { syncLogicAfter, syncLogicBefore } from './';
import getStateMiddleware from '../util/get-state-middleware';
import { set as setWebsocket, PREFIX } from '../websocket';
import { TEACHER_STATE } from '../websocket/message-types';

// eslint-disable-next-line import/prefer-default-export
export function storeForSyncTest(
  publish, reducer = undefined, preState = {},
  stateToDelete = {}, actionTypesToSkip = [],
) {
  const defaultReducer = (state, action) => {
    const stateWithSyncLogicBefore = syncLogicBefore(state, action);
    const reducedState = combineReducers({
      sync: (_state = false) => _state,
      websocket: (_state = {}) => _state,
    })(stateWithSyncLogicBefore, action);
    const stateWithSyncLogicAfter =
      syncLogicAfter(reducedState, action, stateToDelete, actionTypesToSkip);
    return stateWithSyncLogicAfter;
  };

  const preStateWithDefaults = {
    websocket: {
      publish,
    },
    sync: true,
    ...preState,
  };

  const store = createStore(
    reducer || defaultReducer, preStateWithDefaults,
    applyMiddleware(getStateMiddleware),
  );

  // set spy as publish function
  store.dispatch(setWebsocket(undefined, publish));

  // send server state (client won't publish before that)
  store.dispatch({ type: PREFIX + TEACHER_STATE });

  return store;
}
