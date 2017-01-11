import io from 'socket.io-client'

import console from './console'

export const PREFIX = 'clicker/websocket-message/'

export function getUri() {
  //eslint-disable-next-line no-undef
  const port = process.env.REACT_APP_SERVER_PORT
  return port ? document.location.hostname + ':' + port : undefined
}

let socket

export function bindWebsocket(dispatch, uri, types) {
  // close old connection
  if (socket) socket.close()

  socket = io(uri)

  types.forEach(type => {
    type = PREFIX + type
    socket.on(type, (payload) => dispatch({ type, payload }))
  })
  socket.on('connect', () => console.log('Websocket connected'))
  socket.on('disconnect', () => console.log('Websocket disconnected'))
}

export function publish(type, payload) {
  socket.emit(type, payload)
}