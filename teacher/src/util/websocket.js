import { bindWebsocket, getUri } from '../common/websocket'
import { PRESS, BATTERY_RESPONSE, TEACHER } from '../common/message-types'

export function connectWebsocket(dispatch) {
  bindWebsocket(dispatch, getUri(), [PRESS, BATTERY_RESPONSE], TEACHER)
}