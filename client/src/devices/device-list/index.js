import { BUTTON_EVENT }
  from '../../../../common/websocket'
import deviceReducer, { ADD_NEW_LINE, ADD_EMPTY } from '../device'
import { isIgnored } from '../'

export const DELETE = 'clicker/devices/DELETE'

export default function reducer(state = [], action) {
  switch (action.type) {
  case ADD_NEW_LINE:
  case ADD_EMPTY:
    action.deviceId = getNextId(state)
    return addDevice(state, action)
  case BUTTON_EVENT:
    return addDevice(state, action)
  case DELETE:
    return state.filter(d => d.deviceKey !== action.deviceKey)
  default: return state
  }
}

function addDevice(state, action) {
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

export function deleteDevice(deviceKey) {
  return { type: DELETE, deviceKey }
}

export function getNextId(state) {
  return state
    .filter(d => isIgnored(d.deviceType))
    .map(d => parseInt(d.deviceId, 10))
    .reduce((max, current) => Math.max(max, current), 0)
    + 1
}