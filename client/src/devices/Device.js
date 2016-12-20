import React, { PropTypes } from 'react'
import DeviceTypeIcon from './DeviceTypeIcon'
import BatteryLevel from '../battery-level/BatteryLevel'

const Device = ({ deviceType, deviceId, pressed, batteryLevel }) => {
  if (deviceType === 'empty') return null
  return (
    <div
      style={{
        backgroundColor: pressed ? 'lightgrey' : 'white',
      }}
    >
      <div style={{fontSize: '1.3em'}}>
        <DeviceTypeIcon deviceType={deviceType}/>
        &nbsp; {deviceId.substr(-6)}
      </div>
      <BatteryLevel batteryLevel={batteryLevel}/>
    </div>
  )
}

Device.propTypes = {
  deviceType: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  pressed: PropTypes.bool,
  batteryLevel: PropTypes.number,
}

export default Device