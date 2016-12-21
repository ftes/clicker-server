import { combineReducers } from 'redux'
import batteryLevel from '../battery-level'
import buttonPress from '../button-press'
import devices from '../devices'
import deviceNames from '../device-name'
import className from '../class-name'
import editText from '../edit-text'

export const OVERWRITE = 'clicker/core/OVERWRITE'

const reducers = combineReducers({
  editText,
  batteryLevel,
  buttonPress,
  devices,
  deviceNames,
  className,
})

const coreReducer = (state = {}, action) => {
  if (action.type === OVERWRITE) return action.state
  return reducers(state, action)
}

export default coreReducer

export function overwrite(state) {
  return { type: OVERWRITE, state }
}