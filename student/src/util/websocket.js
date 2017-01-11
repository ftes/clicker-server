import { bindWebsocket } from '../common/websocket'

export function connectWebsocket(dispatch, uri) {
  bindWebsocket(dispatch, uri, [])
}