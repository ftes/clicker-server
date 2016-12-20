import React, { PropTypes } from 'react'
import ButtonPress from '../button-press/ButtonPress'
import BatteryLevel from '../battery-level/BatteryLevel'

const Device = ({ deviceType, deviceId, pressed, batteryLevel }) => (
  <div>
    {deviceType}: {deviceId}<br/>
    <ButtonPress pressed={pressed}/><br/>
    <BatteryLevel batteryLevel={batteryLevel}/>
  </div>
)

Device.propTypes = {
  deviceType: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  pressed: PropTypes.bool,
  batteryLevel: PropTypes.number,
}

export default Device