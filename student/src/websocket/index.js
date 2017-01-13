import { bindWebsocket } from '../common/websocket'
import { BATTERY_REQUEST } from '../common/message-types'

export function bind(dispatch, uri) {
  bindWebsocket(dispatch, uri, [BATTERY_REQUEST])
}