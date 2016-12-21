import React, { PropTypes } from 'react'
import DeviceTypeIcon from './DeviceTypeIcon'
import BatteryLevel from '../../battery-level/BatteryLevel'
import DeviceName from '../device-name/DeviceNameC'

const Device = ({ deviceKey, deviceType, deviceId,
  deviceName, pressed, batteryLevel }) => {
  if (deviceType === 'empty') return null
  return (
    <div
      style={{
        backgroundColor: pressed ? 'lightgrey' : 'white',
      }}
    >
      <div style={{fontSize: '1.3em'}}>
        <span style={{display: 'table-cell'}}>
          <DeviceTypeIcon deviceType={deviceType}/>
        </span>
        <span
          style={{
            display: 'table-cell',
            paddingLeft: '5px',
          }}
        >
          <DeviceName
            deviceKey={deviceKey}
            deviceId={deviceId}
            deviceName={deviceName}
          />
        </span>
      </div>
      <BatteryLevel batteryLevel={batteryLevel}/>
    </div>
  )
}

Device.propTypes = {
  deviceKey: PropTypes.string.isRequired,
  deviceType: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  deviceName: PropTypes.string,
  pressed: PropTypes.bool,
  batteryLevel: PropTypes.number,
}

export default Device