import { PRESS } from '../../common/message-types'
import { PREFIX } from '../../common/websocket'
import deviceReducer, { ADD_EMPTY } from '../device'
import { getState as getParentState } from '../'
import { getState as settings } from '../settings'
import { getState as deviceNames } from '../../device-name'

export const DELETE = 'clicker/devices/DELETE'
export const MOVE = 'clicker/devices/MOVE'

export default function reducer(state = [], action) {
  switch (action.type) {
  case ADD_EMPTY:
    action.deviceId = getNextId(state)
    return addDevice(state, action)
  case PREFIX + PRESS:
    return addDevice(state, action)
  case DELETE:
    return state.filter(d => d.deviceKey !== action.deviceKey)
  case MOVE: {
    const toMove = d => d.deviceKey === action.deviceKey
    const notToMove = d => !toMove(d)
    const toReplace = d => d.deviceKey === action.atDeviceKey
    let wasBefore = state.findIndex(toMove) < state.findIndex(toReplace)
    let device = state.find(toMove)
    let withoutDevice = state.filter(notToMove)
    let insertAt = withoutDevice.findIndex(toReplace) + (wasBefore ? 1 : 0)
    return [
      ...withoutDevice.slice(0, insertAt),
      device,
      ...withoutDevice.slice(insertAt)
    ]
  }
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

export function moveDevice(deviceKey, atDeviceKey) {
  return { type: MOVE, deviceKey, atDeviceKey }
}

function getNextId(state) {
  return state
    .filter(d => isIgnored(d.deviceType))
    .map(d => parseInt(d.deviceId, 10))
    .reduce((max, current) => Math.max(max, current), 0)
    + 1
}

export function getState(state) {
  return getParentState(state).list
}

const ignore = ['empty']

function isIgnored(deviceType) {
  return ignore.indexOf(deviceType) !== -1
}

export function isShown(device, state) {
  if (isIgnored(device.deviceType)) return false
  const names =  deviceNames(state)
  const hasCustomName = device.deviceKey in names
  if (settings(state).hideNonCustomNames && !hasCustomName) return false
  return true
}

export function getDevices(state, onlyShown=false) {
  let result = getState(state).filter(d => !isIgnored(d.deviceType))
  if (onlyShown) result = result.filter(device => isShown(device, state))
  return result
}

export function getDevice(state, deviceKey) {
  return getState(state).find(d => d.deviceKey === deviceKey)
}