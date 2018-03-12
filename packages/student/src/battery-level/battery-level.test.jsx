import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import reducer from './';
import BatteryLevelC from './battery-level';

function setup() {
  const store = createStore(reducer);

  // .shallow() returns the inner component:
  // BatteryLevel component, not the outer container
  const wrapper = shallow(<BatteryLevelC store={store} />).shallow();

  return {
    store,
    wrapper,
  };
}

describe('Battery Level', () => {
  it('sets value in store on cordova\'s `batteryStatus` event', () => {
    const { wrapper, store } = setup();
    const component = wrapper.instance();
    component.onBatteryStatus({ level: 70 });
    expect(store.getState()).toBe(0.7);
  });
});
