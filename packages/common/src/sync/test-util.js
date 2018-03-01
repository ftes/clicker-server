import { combineReducers, createStore, applyMiddleware } from 'redux'

import { syncLogicAfter, syncLogicBefore } from './'
import getStateMiddleware from '../util/get-state-middleware'
import { set as setWebsocket, PREFIX } from '../websocket'
import { TEACHER_STATE } from '../websocket/message-types'

export function storeForSyncTest(publish, reducer = undefined, preState = {},
stateToDelete = {}, actionTypesToSkip = []) {
  const defaultReducer = (state, action) => {
    state = syncLogicBefore(state, action)
    state = combineReducers({
      sync: (state=false) => state,
      websocket: (state={}) => state,
    })(state, action)
    state = syncLogicAfter(state, action, stateToDelete, actionTypesToSkip)
    return state
  }

  reducer = reducer || defaultReducer

  preState = {
    websocket: {
      publish
    },
    sync: true,
    ...preState
  }
  
  const store = createStore(reducer, preState,
    applyMiddleware(getStateMiddleware))

  // set spy as publish function
  store.dispatch(setWebsocket(undefined, publish))

  // send server state (client won't publish before that)
  store.dispatch({ type: PREFIX + TEACHER_STATE })

  return store
}