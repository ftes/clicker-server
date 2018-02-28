import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import reducers from './core/reducers'
import App from './components/app'
import getStateMiddleware from './common/util/get-state-middleware'

import './index.css'

const middleware = [
  getStateMiddleware,
]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
}

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)