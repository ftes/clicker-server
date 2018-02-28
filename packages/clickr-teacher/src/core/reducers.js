import { combineReducers } from 'redux'

import batteryLevel from '../common/battery-level'
import buttonPress from '../common/button-press'
import devices from '../common/devices'
import deviceNames from '../common/device-name'
import className from '../common/class-name'
import questions from '../common/questions'
import idMappings from '../common/id-mappings'
import offset from '../common/offset'
import lessons from '../common/lessons'
import saveReducer from '../common/save'
import sync, { syncLogicBefore, syncLogicAfter } from '../common/sync'
import showSettings from '../common/show-settings'
import editText from '../common/edit-text'
import timeOffset from '../common/time-offset'
import websocket, { PREFIX } from '../common/websocket'
import { PRESS } from '../common/websocket/message-types'

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
  lessons,
  sync,
  timeOffset,
  websocket,
})

export const deleteOnLocalStorageSave = {
  buttonPress: true,
  batteryLevel: true,
  timeOffset: true,
  websocket: true,
}

export const deleteOnFileSave = {
  ...deleteOnLocalStorageSave,
  editText: true,
  questions: {
    countdown: true,
    showdown: true,
  },
  sync: true,
}

const deleteOnSync = {
  editText: true,
  buttonPress: true,
  batteryLevel: true,
  showSettings: true,
  sync: true,
  timeOffset: true,
  websocket: true,
}

const preserveOnReset = {
  sync: true
}

const actionTypesToSkipOnSync = [
  // avoids jumpy synchronization during question
  // other clients are expected to display button presses by themselves,
  // and also to evaluate answeredBy (until the master client publishes the
  // canon version of answeredBy when the queston is finished)
  // https://github.com/ftes/clickr/issues/11
  PREFIX + PRESS,
]

const coreReducer = (state = {}, action) => {
  state = saveReducer(state, action, preserveOnReset)
  state = syncLogicBefore(state, action)
  state = reducers(state, action)
  state = syncLogicAfter(state, action, deleteOnSync, actionTypesToSkipOnSync)
  return state
}

export default coreReducer
