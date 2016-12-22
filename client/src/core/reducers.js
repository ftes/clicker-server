import { combineReducers } from 'redux'
import batteryLevel from '../battery-level'
import buttonPress from '../button-press'
import devices from '../devices'
import deviceNames from '../device-name'
import className from '../class-name'
import editText from '../edit-text'
import questions from '../questions'
import idMappings from '../id-mappings'

export const OVERWRITE = 'clicker/core/OVERWRITE'

const reducers = combineReducers({
  editText,
  batteryLevel,
  buttonPress,
  devices,
  deviceNames,
  className,
  questions,
  idMappings,
})

const coreReducer = (state = {}, action) => {
  if (action.type === OVERWRITE) return action.state
  return reducers(state, action)
}

export default coreReducer

export function overwrite(state) {
  return { type: OVERWRITE, state }
}