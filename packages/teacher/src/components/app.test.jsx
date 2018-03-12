import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../core/reducers';
import App from './app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(reducer);
  shallow(<Provider store={store}><App /></Provider>, div);
});
