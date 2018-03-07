import _ from 'lodash'

import { del, overwrite, parseDates } from '../util/js-object'
import { TEACHER_STATE, TEACHER_SYNC_ENABLE, TEACHER_SYNC_FIRST_CLIENT }
  from '../websocket/message-types'
import { getState as websocket, PREFIX, CONNECT } from '../websocket'
import { RESET } from '../save'
import console from '../util/console'

export { storeForSyncTest } from './test-util'

export const SET = 'clicker/sync/SET'

let receivedStateAfterEnablingSync = false
let lastSyncedState = null
function publishState(state = {}, action, stateToDelete={},
actionTypesToSkip=[]) {
  switch (action.type) {
  case PREFIX + TEACHER_STATE:
    // Receiving state does not trigger publishing
    return
  // unless this is the first client to enable sync
  case PREFIX + TEACHER_SYNC_FIRST_CLIENT:
  default: {
    console.info('sync: debating whether to sync action', action.type)
    // Every other action triggers publishing if sync is enabled.
    const syncEnabled = getState(state)
    if (syncEnabled) {
      console.info('sync: sync is enabled for action', action.type)
      // do not sync on actions in skip-list
      if (actionTypesToSkip.indexOf(action.type) !== -1) return
      console.info('sync: action not on skip-list', action.type)

      // Wait for remote state before publishing own state
      if (!receivedStateAfterEnablingSync) return
      console.info('sync: received state after enabling sync', action.type)

      let stateToSync = del(state, stateToDelete)
      const hasChanged = ! _.isEqual(stateToSync, lastSyncedState)
      const firstSyncClient = action.type === PREFIX + TEACHER_SYNC_FIRST_CLIENT
      lastSyncedState = stateToSync
      
      if (hasChanged || firstSyncClient) {
        console.info('sync: state has changed or this is the first sync client', action.type)
        if (!action.getState) return // likely redux's @@INIT@@ action
        console.info('sync: action.getState is set by middleware', action.type)
        const { publish } = websocket(action.getState())
        publish(TEACHER_STATE, stateToSync)
        console.info('sync: published state for action', action.type)
      }
    }
  }}
}

const receiveShallow = {
  questions: {
    list: true,
    showdown: true,
  },
  devices: {
    list: true,
  },
  deviceNames: true,
  idMappings: true,
  lessons: true,
  offset: true,
}

function receiveState(state = {}, action) {
  switch (action.type) {
  case PREFIX + TEACHER_SYNC_FIRST_CLIENT:
    // first sync client -> don't use empty server state
    receivedStateAfterEnablingSync = true
    return state
  case PREFIX + TEACHER_STATE: {
    receivedStateAfterEnablingSync = true
    let receivedState = action.payload
    receivedState = parseDates(receivedState)
    state = overwrite(state, receivedState, receiveShallow)
    return state
  }
  default: return state
  }
}

export function notifyServerOnSyncStatusChange(state = {}, action) {
  switch (action.type) {
  case RESET:
  case CONNECT:
  case SET: {
    receivedStateAfterEnablingSync = false
    const syncEnabled = getState(state)

    // socket is not available on startup (before Websocket component loaded)
    const socketState = websocket(action.getState())
    if (socketState && socketState.socket) {
      socketState.publish(TEACHER_SYNC_ENABLE, syncEnabled)
    }
    return
  }
  default: return
  }
}

export function syncLogicBefore(state = {}, action) {
  state = receiveState(state, action)
  return state
}

export function syncLogicAfter(state = {}, action, stateToDelete,
actionTypesToSkip) {
  notifyServerOnSyncStatusChange(state, action)
  publishState(state, action, stateToDelete, actionTypesToSkip)
  return state
}

const initialState = false
export const syncEnabledReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET:
    return action.enabled
  default: return state
  }
}

export default syncEnabledReducer

export function getState(state) {
  return state.sync
}

export function set(enabled) {
  return { type: SET, enabled }
}
