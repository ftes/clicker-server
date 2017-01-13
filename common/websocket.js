import io from 'socket.io-client'

import console from './console'

export const PREFIX = 'clicker/websocket-message/'

export function getUri() {
  //eslint-disable-next-line no-undef
  const port = process.env.REACT_APP_SERVER_PORT
  return port ? document.location.hostname + ':' + port : undefined
}

let socket

export function bindWebsocket(dispatch, uri, types, clientType) {
  // close old connection
  if (socket) socket.close()

  socket = io(uri)

  types.forEach(type =>
    socket.on(type, (payload) =>
      dispatch({ type: PREFIX + type, payload }))
  )
  socket.on('connect', () => {
    console.log('Websocket connected')
    socket.emit(clientType)
  })
  socket.on('disconnect', () => console.log('Websocket disconnected'))
}

export function publish(type, payload) {
  socket.emit(type, payload)
}