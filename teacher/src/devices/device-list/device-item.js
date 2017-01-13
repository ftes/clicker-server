import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Points from '../../points/points'
import { isIgnored, deleteDevice } from './'
import Offset from '../../offset/offset'
import { getState as showSettings } from '../../show-settings'
import DeviceName from '../../device-name/device-name'
import BatteryLevel from '../../battery-level/battery-level'
import Button from '../../components/button'

// Component
export const DeviceItem = ({ device, tabIndex, showSettings,
  deleteCallback }) => {
  const { deviceKey, deviceId, deviceType } = device
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      {/* left column */}
      <div
        style={{
          padding: '8px',
          flexGrow: '1',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>
          <DeviceName
            deviceKey={deviceKey}
            deviceId={deviceId}
            tabIndex={isIgnored(deviceType) ? null : tabIndex++}
            style={{ fontSize: '16px' }}
          />
        </div>
        <div>
        {!isIgnored(device.deviceType) &&
          <Offset deviceKey={deviceKey}
            style={{ flexGrow: 1, background: 'transparent' }}>
            <Points deviceKey={device.deviceKey} style={{
              margin: '6px 12px',
              fontSize: '20px',
              fontWeight: 'bold' }}
            />
          </Offset>
        }
        </div>
      </div>
      {/* right column */}
      {showSettings &&
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px', borderLeft: '1px solid lightgrey' }}>
          <Button
            bsSize='small'
            onClick={() => deleteCallback(deviceKey)}
            title='Delete'
            label='x'
          />
          <div style={{ flexGrow: 1 }}/>
          <BatteryLevel deviceKey={deviceKey}/>  
        </div>
      }
    </div>
  )
}

DeviceItem.propTypes = {
  device: PropTypes.object.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  showSettings: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,
}

// Container
const mapStateToProps = (state) => ({
  showSettings: showSettings(state),
})

const mapDispatchToProps = (dispatch) => ({
  deleteCallback: (deviceKey) => dispatch(deleteDevice(deviceKey)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeviceItem)