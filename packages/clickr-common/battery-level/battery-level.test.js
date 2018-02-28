import React from 'react'
import { shallow } from 'enzyme'
import FontAwesome from 'react-fontawesome'

import { BatteryLevel } from './battery-level'

function setup(level) {
  const wrapper = shallow(<BatteryLevel batteryLevel={level} showPercent={true} />)
  return wrapper
}

describe('Battery Level', () => {
  it('uses correct battery symbol', () => {
    let wrapper = setup(0.9)
    expect(wrapper.find(FontAwesome).prop('name')).toEqual('battery-full')
    wrapper = setup(0.7)
    expect(wrapper.find(FontAwesome).prop('name')).toEqual('battery-three-quarters')
    wrapper = setup(0.5)
    expect(wrapper.find(FontAwesome).prop('name')).toEqual('battery-half')
    wrapper = setup(0.3)
    expect(wrapper.find(FontAwesome).prop('name')).toEqual('battery-quarter')
    wrapper = setup(0.1)
    expect(wrapper.find(FontAwesome).prop('name')).toEqual('battery-empty')
  })

  it('displays correct percentage', () => {
    const wrapper = setup(0.7)
    expect(wrapper.find('#text').text()).toEqual('70%')
  })
})