import { key as getKey } from '../../common/device'
import { PRESS } from '../../common/message-types'
import { PREFIX } from '../../common/websocket'

export const ADD_EMPTY = 'clicker-xbee/devices/ADD_EMPTY'

export default function reducer(state = undefined, action) {
  switch (action.type) {
  // add device upon button press
  case PREFIX + PRESS: {
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
  case ADD_EMPTY: {
    let deviceType = 'empty'
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

export function addEmpty() {
  return { type: ADD_EMPTY }
}