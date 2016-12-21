import React from 'react'
import { ButtonToolbar } from 'react-bootstrap'
import RequestBatteryLevel from '../battery-level/RequestBatteryLevelC'
import DeviceList from './device-list/DeviceListC'
import AddNewLine from './device/AddNewLineC'
import AddEmpty from './device/AddEmptyC'

const Devices = () =>
  <div>
    <DeviceList/>
    <ButtonToolbar>
      <RequestBatteryLevel/>
      <AddNewLine/>
      <AddEmpty/>
    </ButtonToolbar>
  </div>

export default Devices