import io from 'socket.io-client'
import { messageTypes } from '../../../common/websocket'
import console from '../util/console'

let serverPort = process.env.REACT_APP_SERVER_PORT
let uri = serverPort ? `localhost:${serverPort}` : undefined
const socket = io(uri)

export const init = (store) => {
  // add listeners to socket messages so we can re-dispatch them as actions
  messageTypes
    .forEach(type => socket.on(type,
      payload => {
        console.info(`message ${type}`, payload)
        store.dispatch({ type, payload })
      }))
}

export const emit = (type, payload) => socket.emit(type, payload)