import _ from 'lodash'

import { BATTERY_REQUEST, BATTERY_RESPONSE }
  from '../common/websocket/message-types'
import { PREFIX } from '../common/websocket'
import { publish } from '../websocket'
import { get as getSetting, getState as settings } from '../settings'

export const SET = 'clicker/battery-level/SET'

const initialState = null
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET:
    return action.level
  case PREFIX + BATTERY_REQUEST: {
    _.range(0, getSetting(settings(action.getState()), 'nButtons')).forEach(i =>
      publish(BATTERY_RESPONSE, { level: state }, action.getState(), i+1)
    )
    return state
  }
  default: return state
  }
}

export default reducer

export function set(level) {
  return { type: SET, level }
}

export function getState(state) {
  return state.batteryLevel
}