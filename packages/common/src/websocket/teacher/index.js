import { bindWebsocket, getUri } from '../'
import { PRESS, BATTERY_RESPONSE, TEACHER_STATE, TEACHER_SYNC_FIRST_CLIENT,
  TIME } from '../message-types'
import { TEACHER } from '../namespaces'

export { default as Websocket } from './websocket'

export function bind(dispatch) {
  bindWebsocket(dispatch, getUri(),
    [PRESS, BATTERY_RESPONSE, TEACHER_STATE, TEACHER_SYNC_FIRST_CLIENT, TIME],
    TEACHER)
}