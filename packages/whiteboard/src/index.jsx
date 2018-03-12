import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { getStateMiddleware } from '@clickr/common/lib/util';

import reducers from './core/reducers';
import App from './components/app';

import './index.css';

const middleware = [
  getStateMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
}

const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
