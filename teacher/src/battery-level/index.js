import { key } from '../common/device'
import { PREFIX, publish } from '../common/websocket'
import { BATTERY_REQUEST, BATTERY_RESPONSE } from '../common/message-types'


export const REQUEST = 'clicker/battery-level/REQUEST'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case REQUEST:
    return {} // remove cached battery levels
  case PREFIX + BATTERY_RESPONSE: {
    let data = action.payload
    return {
      ...state,
      [key(data)]: data.level
    }
  }
  default: return state
  }
}

export function request() {
  publish(BATTERY_REQUEST)
  return { type: REQUEST }
}

export function getState(state) {
  return state.batteryLevel
}