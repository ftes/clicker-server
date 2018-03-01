import { combineReducers } from 'redux'

import settings from '../settings'
import buttons from '../buttons'
import { PRESS as PRESS_INTERNAL } from '../buttons'
import { publish } from '../websocket'
import { PRESS } from '@clickr/common/lib/websocket/message-types'
import batteryLevel from '../battery-level'
import saveReducer from '@clickr/common/lib/save'

const reducers = combineReducers({
  settings,
  buttons,
  batteryLevel,
})

export const deleteOnSave = {
  buttons: true,
  batteryLevel: true,
}

const coreReducer = (state = {}, action) => {
  state = saveReducer(state, action)
  if (action.type === PRESS_INTERNAL) {
    const pressed = action.pressed
    publish(PRESS, { pressed }, state, action.number)
  }
  return reducers(state, action)
}

export default coreReducer