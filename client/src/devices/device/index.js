import { key as getKey } from '../../util/device'
import { BUTTON_EVENT }
  from '../../../../common/websocket'

export const ADD_NEW_LINE = 'clicker-xbee/devices/ADD_NEW_LINE'
export const ADD_EMPTY = 'clicker-xbee/devices/ADD_EMPTY'

export default function reducer(state = undefined, action) {
  switch (action.type) {
  // add device upon button press
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
  case ADD_EMPTY: {
    let deviceType = action.type === ADD_EMPTY ? 'empty' : 'newLine'
    let deviceKey = `${deviceType}/${action.deviceId}`
    return {
      deviceKey,
      deviceType,
      deviceId: `${action.deviceId}`,
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