import io from 'socket.io-client'

import { SET as STATE_SET } from '../core/reducers'
import { initialState as settingsInitialState,
  getState as settings, get as getSetting } from '../settings'
import { PRESS } from '../buttons'

export const RECONNECT = 'clicker/websocket/RECONNECT'

const initialState = () => io(getSetting(settingsInitialState, 'server'))

function newSocket(oldSocket, server) {
  oldSocket.disconnect()
  return io(server)
}

export const reducer = (state = initialState(), action) => {
  switch (action.type) {
  case RECONNECT:
  case STATE_SET:
    return newSocket(state, getSetting(settings(action.getState()), 'server'))
  case PRESS: {
    let pressed = action.pressed
    let deviceId = settings(action.getState()).deviceId
    deviceId = `${deviceId}.${action.number}`
    state.emit('press', { deviceId, pressed })
    return state
  }
  default: return state
  }
}

export default reducer

export function reconnect() {
  return { type: RECONNECT }
}