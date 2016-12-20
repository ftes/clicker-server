import { BUTTON_EVENT, BATTERY_LEVEL_RESPONSE } from '../../../common/websocket'
import { key as getKey } from '../util/device'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case BATTERY_LEVEL_RESPONSE:
  case BUTTON_EVENT: {
    let data = action.payload
    let deviceType = data.deviceType
    let deviceId = data.deviceId
    let deviceKey = getKey(data)
    return {
      ...state,
      [deviceKey]: {
        deviceType,
        deviceId,
        deviceKey
      }
    }
  }
  default: return state
  }
}