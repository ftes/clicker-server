import React, { PropTypes } from 'react'
import { ButtonToolbar } from 'react-bootstrap'
import RequestBatteryLevel from '../battery-level/RequestBatteryLevelC'
import DeviceList from './device-list/DeviceListC'
import AddEmpty from './device/AddEmptyC'
import Settings from './settings/SettingsC'

const Devices = ({ showSettings }) =>
  <div>
    <Settings/>
    <DeviceList/>
    {showSettings &&
      <ButtonToolbar
        style={{
          marginBottom: '20px',
        }}
      >
        <RequestBatteryLevel/>
        <AddEmpty/>
      </ButtonToolbar>
    }
  </div>

Devices.propTypes = {
  showSettings: PropTypes.bool.isRequired,
}

export default Devices