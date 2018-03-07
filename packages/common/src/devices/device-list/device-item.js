import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Points from '../../points/points'
import { deleteDevice } from './'
import Offset from '../../offset/offset'
import { getState as showSettings } from '../../show-settings'
import DeviceName from '../../device-name/device-name'
import { BatteryLevel } from '../../battery-level'
import { Button } from '../../components'
import { isShown } from './'
import { getState as settings } from '../settings'

// Component
export const DeviceItem = ({ device, tabIndex, showSettings,
  deleteCallback, state, settings }) => {
  const { deviceKey, deviceId } = device
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
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
        {isShown(device, state) &&
          <div>
          <div>
            <DeviceName
              deviceKey={deviceKey}
              deviceId={deviceId}
              tabIndex={tabIndex++}
              style={{ fontSize: settings.fontSizeNames + 'pt' }}
            />
          </div>
          <div>
            <Offset deviceKey={deviceKey}
              style={{ flexGrow: 1, background: 'transparent' }}>
              <Points deviceKey={device.deviceKey} style={{
                margin: '6px 12px',
                fontSize: settings.fontSizePoints + 'pt',
                fontWeight: 'bold' }}
              />
            </Offset>
          </div>
          </div>
        }
      </div>
      {/* right column */}
      {showSettings &&
        <div style={{ display: 'flex', flexDirection: 'column',
          padding: '8px', borderLeft: '1px solid lightgrey' }}>
          <Button
            bsSize='small'
            onClick={() => deleteCallback(deviceKey)}
            title='Delete'
            label='x'
          />
          <div style={{ flexGrow: 1 }}/>
          {isShown(device, state) &&
            <BatteryLevel deviceKey={deviceKey}/>
          }
        </div>
      }
    </div>
  )
}

DeviceItem.propTypes = {
  device: PropTypes.object.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  showSettings: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
}

// Container
const mapStateToProps = (state) => ({
  showSettings: showSettings(state),
  state,
  settings: settings(state),
})

const mapDispatchToProps = (dispatch) => ({
  deleteCallback: (deviceKey) => dispatch(deleteDevice(deviceKey)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeviceItem)