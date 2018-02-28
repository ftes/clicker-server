import { combineReducers } from 'redux'

import buttonPress from '../common/button-press'
import devices from '../common/devices'
import deviceNames from '../common/device-name'
import className from '../common/class-name'
import questions from '../common/questions'
import idMappings from '../common/id-mappings'
import offset from '../common/offset'
import lessons from '../common/lessons'
import { syncLogicBefore, notifyServerOnSyncStatusChange } from '../common/sync'
import timeOffset from '../common/time-offset'

const reducers = combineReducers({
  buttonPress,
  devices,
  deviceNames,
  className,
  questions,
  idMappings,
  offset,
  lessons,
  timeOffset,
  sync: () => true,
  editText: () => ({}),
  showSettings: () => false,
})

const coreReducer = (state = {}, action) => {
  state = syncLogicBefore(state, action)
  state = reducers(state, action)
  // omit syncLogicAfter (that would publish state)
  notifyServerOnSyncStatusChange(state, action)
  return state
}

export default coreReducer
