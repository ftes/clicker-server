import React, { PropTypes } from 'react'
import { ButtonToolbar } from 'react-bootstrap'
import RequestBatteryLevel from '../battery-level/request-battery-level'
import DeviceList from './device-list/device-list'
import AddEmpty from './device/add-empty'
import Settings from './settings/settings'

export const Devices = ({ showSettings }) =>
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