import { BUTTON_EVENT, BATTERY_LEVEL_RESPONSE } from '../../../common/websocket'
import { key as getKey } from '../util/device'

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
      ...state,
      [deviceKey]: {
        deviceType,
        deviceId,
        deviceKey
      }
    }
  }
  case ADD_NEW_LINE:
    return {
      ...state,
      [`newLine/${i}`]: { deviceType: 'newLine', deviceId: `${i++}` }
    }
  case ADD_EMPTY: {
    let key = `empty/${i}`
    return {
      ...state,
      [key]: { deviceType: 'empty', deviceId: `${i++}`, deviceKey: key }
    }
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