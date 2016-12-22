import deviceListReducer from './device-list'

export default deviceListReducer

export function getDevices(state) {
  const ignore = ['newLine', 'empty']
  return Object.values(state).filter(d => ignore.indexOf(d.deviceType) === -1)
}