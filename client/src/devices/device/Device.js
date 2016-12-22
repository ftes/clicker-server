import React, { PropTypes } from 'react'
import DeviceTypeIcon from './DeviceTypeIcon'
import BatteryLevel from '../../battery-level/BatteryLevel'
import DeviceName from '../../device-name/DeviceNameC'
import { isIgnored } from '../'

const Device = ({ deviceKey, deviceType, deviceId,
  pressed, batteryLevel, tabIndex, showSettings }) => {
  if (isIgnored(deviceType)) return null
  return (
    <div
      style={{
        backgroundColor: pressed ? 'lightgrey' : 'white',
      }}
    >
      <div style={{ fontSize: '1.3em' }}>
        {showSettings &&
          <span style={{ display: 'table-cell' }}>
            <DeviceTypeIcon deviceType={deviceType}/>
          </span>
        }
        <span
          style={{
            display: 'table-cell',
            paddingLeft: '5px',
          }}
        >
          <DeviceName
            deviceKey={deviceKey}
            deviceId={deviceId}
            tabIndex={tabIndex}
          />
        </span>
      </div>
      {showSettings &&
        <BatteryLevel batteryLevel={batteryLevel}/>
      }
    </div>
  )
}

Device.propTypes = {
  deviceKey: PropTypes.string.isRequired,
  deviceType: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  pressed: PropTypes.bool,
  batteryLevel: PropTypes.number,
  tabIndex: PropTypes.number,
  showSettings: PropTypes.bool.isRequired,
}

export default Device