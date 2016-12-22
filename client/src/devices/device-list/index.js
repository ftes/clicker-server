import { BUTTON_EVENT }
  from '../../../../common/websocket'
import deviceReducer, { ADD_NEW_LINE, ADD_EMPTY } from '../device'
import { OVERWRITE } from '../../core/reducers'
import { isIgnored } from '../'

export const DELETE = 'clicker/devices/DELETE'

let virtualId = 0

export default function reducer(state = [], action) {
  switch (action.type) {
  case OVERWRITE:
    virtualId = 0
    for (let device of state) {
      if (isIgnored(device.deviceType)) {
        let id = parseInt(device.deviceId, 10)
        if (id >= virtualId) virtualId = id + 1
      }
    }
    return state
  case BUTTON_EVENT:
  case ADD_NEW_LINE:
  case ADD_EMPTY: {
    // add new device
    let device = deviceReducer(state[action.deviceKey], action)
    if (!device) return state
    let existing = state.find(d => d.deviceKey === device.deviceKey)
    if (existing) return state
    return [
      ...state,
      device
    ]
  }
  case DELETE:
    return state.filter(d => d.deviceKey !== action.deviceKey)
  default: return state
  }
}

export function deleteDevice(deviceKey) {
  return { type: DELETE, deviceKey }
}

export function getNextVirtualId() {
  return virtualId++
}