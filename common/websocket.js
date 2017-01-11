import autobahn from 'autobahn'

import console from './console'

export const PREFIX = 'clicker/websocket-message/'
const SET = 'clicker/websocket/SET'

function getUri() {
  //eslint-disable-next-line no-undef
  const port = process.env.REACT_APP_SERVER_PORT
  let uri = 'ws://'

  if (port) {
    uri += document.location.hostname + ':' + port
  } else {
    uri += document.location.host
  }

  return uri + '/ws'
}

export function connect(state, dispatch) {
  // close old connection
  if (state.connection) state.connection.close()

  const connection = new autobahn.Connection({
    url: getUri(),
    realm: 'default',
  })

  let sessionResolve, sessionReject
  const sessionPromise = new Promise((resolve, reject) => {
    sessionResolve = resolve
    sessionReject = reject
  })

  connection.onopen = function(session) {
    console.log('Autobahn connected')
    sessionResolve(session)

    session.subscribe('',
      (payload) => {
        let type = PREFIX + 'xyz'
        dispatch({ type, payload })
      }, { match: 'wildcard' })
  }

  connection.onclose = function() {
    console.log('Autobahn disconnected')
    sessionReject()
  }

  connection.open()

  const publish = (type, payload) => {
    sessionPromise.then(session => session.publish(type, payload))
  }

  dispatch({type: SET, publish, connection })
}

const initialState = {
  publish: null,
  connection: null,
}
export function reducer(state=initialState, action) {
  switch (action.type) {
  case SET:
    return {
      ...state,
      publish: action.publish,
      connection: action.connection,
    }
  default: return state
  }
}

export function getState(state) {
  return state.websocket
}