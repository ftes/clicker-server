import io from 'socket.io-client';

import console from '../util/console';

export * from './message-types';
export * from './namespaces';
export { default as Websocket } from './websocket';
export { Websocket as TeacherWebsocket } from './teacher';

export const PREFIX = 'clicker/websocket-message/';
export const CONNECT = 'clicker/websocket/connect';
export const DISCONNECT = 'clicker/websocket/disconnect';

export function getUri() {
  // eslint-disable-next-line no-undef
  const port = process.env.REACT_APP_SERVER_PORT;
  if (port) return `${document.location.hostname}:${port}`;
  return '';
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

export function set(sckt, pblsh) {
  return { type: SET, sckt, pblsh };
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
