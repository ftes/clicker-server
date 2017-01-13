import { combineReducers } from 'redux'
import batteryLevel from '../battery-level'
import buttonPress from '../button-press'
import devices from '../devices'
import deviceNames from '../device-name'
import className from '../class-name'
import editText from '../edit-text'
import questions from '../questions'
import idMappings from '../id-mappings'
import showSettings from '../show-settings'
import offset from '../offset'
import { OVERWRITE } from '../common/save'

export const RESET = 'clicker/core/RESET'

const reducers = combineReducers({
  editText,
  batteryLevel,
  buttonPress,
  devices,
  deviceNames,
  className,
  questions,
  idMappings,
  showSettings,
  offset,
})

const coreReducer = (state = {}, action) => {
  if (action.type === OVERWRITE) state = action.state
  if (action.type === RESET) state = undefined
  
  return reducers(state, action)
}

export default coreReducer

export function overwrite(state) {
  return { type: OVERWRITE, state }
}

export function reset() {
  return { type: RESET }
}