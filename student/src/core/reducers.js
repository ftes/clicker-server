import { combineReducers } from 'redux'
import _ from 'lodash'

import settings from '../settings'
import buttons from '../buttons'
import { PRESS as PRESS_INTERNAL } from '../buttons'
import { publish } from '../websocket'
import { PRESS } from '../common/message-types'
import batteryLevel from '../battery-level'
import { OVERWRITE } from '../save'

const reducers = combineReducers({
  settings,
  buttons,
  batteryLevel,
})

const overwriteOnLoad = {
  settings: {
    unlocked: false,
  }
}

function load(state) {
  return _.merge({}, state, overwriteOnLoad)
}

const coreReducer = (state = {}, action) => {
  if (action.type === OVERWRITE && action.state) state = load(action.state)
  if (action.type === PRESS_INTERNAL) {
    const pressed = action.pressed
    publish(PRESS, { pressed }, state, action.number)
  }
  return reducers(state, action)
}

export default coreReducer