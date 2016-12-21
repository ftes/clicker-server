import { key as getKey } from '../../util/device'
import { BUTTON_EVENT, BATTERY_LEVEL_RESPONSE }
  from '../../../../common/websocket'
import { FINISH as EDIT_NAME_FINISH } from '../device-name'

export const ADD_NEW_LINE = 'clicker-xbee/devices/ADD_NEW_LINE'
export const ADD_EMPTY = 'clicker-xbee/devices/ADD_EMPTY'

let i = 0

export default function reducer(state = {}, action) {
  switch (action.type) {
  case BATTERY_LEVEL_RESPONSE:
  case BUTTON_EVENT: {
    let data = action.payload
    let deviceType = data.deviceType
    let deviceId = data.deviceId
    let deviceKey = getKey(data)
    return {
      deviceType,
      deviceId,
      deviceKey
    }
  }
  case ADD_NEW_LINE:
    return {
      deviceType: 'newLine',
      deviceId: `${i++}`,
      deviceKey: `newLine/${i}`
    }
  case ADD_EMPTY: {
    return {
      deviceType: 'empty',
      deviceId: `${i++}`,
      deviceKey: `empty/${i}`
    }
  }
  case EDIT_NAME_FINISH:
    if (action.cancelled) return state
    return {
      ...state,
      deviceName: action.deviceName || undefined,
    }
  default: return state
  }
}

export function addNewLine() {
  return { type: ADD_NEW_LINE }
}

export function addEmpty() {
  return { type: ADD_EMPTY }
}