import { combineReducers } from 'redux'
import _ from 'lodash'

import settings from '../settings'
import buttons from '../buttons'
import { PRESS as PRESS_INTERNAL } from '../buttons'
import { publish } from '../common/websocket'
import { PRESS } from '../common/message-types'
import { get as getSetting } from '../settings'

export const SET = 'clicker/core/SET'

const reducers = combineReducers({
  settings,
  buttons,
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
  if (action.type === SET && action.state) state = load(action.state)
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

export function setState(state) {
  return { type: SET, state }
}