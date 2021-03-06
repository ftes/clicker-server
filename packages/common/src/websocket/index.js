import io from 'socket.io-client';

import console from '../util/console';

export * from './message-types';
export * from './namespaces';
export { default as Websocket } from './websocket';
export { Websocket as TeacherWebsocket } from './teacher';

export const PREFIX = 'clicker/websocket-message/';
export const CONNECT = 'clicker/websocket/connect';
export const DISCONNECT = 'clicker/websocket/disconnect';

export function getUri(port) {
  return port
    ? `${document.location.hostname}:${port}`
    : '';
}

// socket & publish in state are used by sync logic, to allow better testing
const SET = 'clickr/websocket/SET';
export const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET:
      return {
        socket: action.socket,
        publish: action.publish,
      };
    default: return state;
  }
};
export default reducer;

export const getState = state => state.websocket;

// eslint-disable-next-line import/no-mutable-exports
export let socket;

export function publish(type, payload) {
  console.log(`publish ${type}:`, payload);
  socket.emit(type, payload);
}

// eslint-disable-next-line no-shadow
export function set(socket, publish) {
  return { type: SET, socket, publish };
}

export function bindWebsocket(dispatch, uri, types, namespace) {
  // close old connection
  if (socket) socket.close();

  socket = io(uri + namespace);

  types.forEach(type =>
    socket.on(type, payload =>
      dispatch({ type: PREFIX + type, payload })));
  socket.on('connect', () => {
    console.log('Websocket connected');
    dispatch({ type: CONNECT });
    dispatch(set(socket, publish));
  });
  socket.on('disconnect', () => {
    console.log('Websocket disconnected');
    dispatch({ type: DISCONNECT });
  });
}
