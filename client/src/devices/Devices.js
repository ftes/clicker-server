import React, { PropTypes } from 'react'
import { ButtonToolbar } from 'react-bootstrap'
import RequestBatteryLevel from '../battery-level/RequestBatteryLevelC'
import DeviceList from './device-list/DeviceListC'
import AddNewLine from './device/AddNewLineC'
import AddEmpty from './device/AddEmptyC'

const Devices = ({ showSettings }) =>
  <div>
    <DeviceList/>
    {showSettings &&
      <ButtonToolbar>
        <RequestBatteryLevel/>
        <AddNewLine/>
        <AddEmpty/>
      </ButtonToolbar>
    }
  </div>

Devices.propTypes = {
  showSettings: PropTypes.bool.isRequired,
}

export default Devices