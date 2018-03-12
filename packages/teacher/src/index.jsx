import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import { getStateMiddleware } from '@clickr/common/lib/util';
import App from './components/app';
import reducer from './core/reducers';

const middleware = [
  getStateMiddleware,
];

// if (process.env.NODE_ENV === 'development') {
middleware.push(logger);
// }

const store = createStore(
  // eslint-disable-next-line no-underscore-dangle
  reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
