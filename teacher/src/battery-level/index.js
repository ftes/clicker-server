import { key } from '../common/device'
import { PREFIX, publish } from '../common/websocket'

export const REQUEST = 'clicker/battery-level/REQUEST'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case REQUEST:
    return {} // remove cached battery levels
  case PREFIX + 'battery': {
    let data = action.payload
    return {
      ...state,
      [key(data)]: data.batteryLevel
    }
  }
  default: return state
  }
}

export function requestBatteryLevel() {
  publish('battery?')
}

export function getState(state) {
  return state.batteryLevel
}