import { combineReducers } from 'redux'
import batteryLevel from '../battery-level'
import buttonPress from '../button-press'
import devices from '../devices'
import deviceNames from '../device-name'

export const OVERWRITE = 'clicker/core/OVERWRITE'

const reducers = combineReducers({
  batteryLevel,
  buttonPress,
  devices,
  deviceNames,
})

const coreReducer = (state = {}, action) => {
  if (action.type === OVERWRITE) return action.state
  return reducers(state, action)
}

export default coreReducer

export function overwrite(state) {
  return { type: OVERWRITE, state }
}