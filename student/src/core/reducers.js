import { combineReducers } from 'redux'
import _ from 'lodash'

import settings from '../settings'
import buttons from '../buttons'
import { PRESS as PRESS_INTERNAL } from '../buttons'
import { publish } from '../common/websocket'
import { PRESS } from '../common/message-types'
import { get as getSetting } from '../settings'
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
    const deviceId = getSetting(state.settings, 'deviceId')
      + '.' + action.number
    const pressed = action.pressed
    const deviceType = 'tablet'
    publish(PRESS, { deviceType, deviceId, pressed })
  }
  return reducers(state, action)
}

export default coreReducer