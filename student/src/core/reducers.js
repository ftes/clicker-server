import { combineReducers } from 'redux'
import _ from 'lodash'

import settings from '../settings'
import buttons from '../buttons'
import websocket from '../websocket'

export const SET = 'clicker/core/SET'

const reducers = combineReducers({
  settings,
  buttons,
  websocket,
})

const overwriteOnLoad = {
  settings: {
    unlocked: false,
  }
}

export function load(state) {
  return _.merge({}, state, overwriteOnLoad)
}

const coreReducer = (state = {}, action) => {
  if (action.type === SET) state = action.state
  return reducers(state, action)
}

export default coreReducer

export function setState(state) {
  return { type: SET, state }
}