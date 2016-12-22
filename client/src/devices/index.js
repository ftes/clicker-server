import deviceListReducer from './device-list'

export default deviceListReducer

const ignore = ['newLine', 'empty']

export function isIgnored(deviceType) {
  return ignore.indexOf(deviceType) !== -1
}

export function getDevices(state) {
  return Object.values(state).filter(d => !isIgnored(d.deviceType))
}

export function getDevice(state, deviceKey) {
  return state.find(d => d.deviceKey === deviceKey)
}