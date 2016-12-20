import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './core/App'
import reducer from './core/reducers'
import { init as websocketInit } from './util/websocket'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__())
websocketInit(store)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
