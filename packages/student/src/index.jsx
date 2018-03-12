import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { getStateMiddleware } from '@clickr/common/lib/util';

import reducers from './core/reducers';
import App from './components/app';

import './index.css';

const middleware = [
  thunkMiddleware,
  getStateMiddleware, // access global state via action.getState()
];
// eslint-disable-next-line no-undef
// if (process.env.NODE_ENV !== 'production') {
middleware.push(logger);
// }

const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
);

function startApp() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
}

if (window.cordova) {
  document.addEventListener('deviceready', () => startApp());
} else {
  startApp();
}
