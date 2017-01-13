import React, { PropTypes } from 'react'
import DeviceTypeIcon from './DeviceTypeIcon'
import DeviceName from '../../device-name/DeviceNameC'
import { isIgnored } from '../device-list'
import BatteryLevel from '../../battery-level/BatteryLevel'

const Device = ({ deviceKey, deviceType, deviceId,
  tabIndex, showSettings }) => {
  if (isIgnored(deviceType)) return null
  return (
    <div>
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
      {showSettings &&
        <BatteryLevel deviceKey={deviceKey}/>  
      }
      </div>
    </div>
  )
}

Device.propTypes = {
  deviceKey: PropTypes.string.isRequired,
  deviceType: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
  showSettings: PropTypes.bool.isRequired,
}

export default Device