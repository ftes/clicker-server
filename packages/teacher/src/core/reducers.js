import { combineReducers } from 'redux'

import batteryLevel from '@clickr/common/lib/battery-level'
import buttonPress from '@clickr/common/lib/button-press'
import devices from '@clickr/common/lib/devices'
import deviceNames from '@clickr/common/lib/device-name'
import className from '@clickr/common/lib/class-name'
import questions from '@clickr/common/lib/questions'
import idMappings from '@clickr/common/lib/id-mappings'
import offset from '@clickr/common/lib/offset'
import lessons from '@clickr/common/lib/lessons'
import saveReducer from '@clickr/common/lib/save'
import sync, { syncLogicBefore, syncLogicAfter } from '@clickr/common/lib/sync'
import showSettings from '@clickr/common/lib/show-settings'
import editText from '@clickr/common/lib/edit-text'
import timeOffset from '@clickr/common/lib/time-offset'
import websocket, { PREFIX, PRESS } from '@clickr/common/lib/websocket'

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
