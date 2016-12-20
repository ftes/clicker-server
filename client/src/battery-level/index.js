import { BATTERY_LEVEL_REQUEST, BATTERY_LEVEL_RESPONSE } from '../../../common/websocket'
import { convertBatteryLevel } from '../../../common/devices'
import { emit } from '../util/websocket'
import { key } from '../util/device'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case BATTERY_LEVEL_REQUEST:
    return {}; // remove cached battery levels
  case BATTERY_LEVEL_RESPONSE:
    let data = action.payload
    return {
      ...state,
      [key(data)]: convertBatteryLevel[data.deviceType](data.raw)
    }
  default: return state
  }
}

export function requestBatteryLevel() {
  emit(BATTERY_LEVEL_REQUEST)
  return { type: BATTERY_LEVEL_REQUEST }
}