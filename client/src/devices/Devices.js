import React from 'react'
import { ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap'
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
    <div style={{marginTop: '30px'}}>
      <h3>Hints</h3>
      <ListGroup>
        <ListGroupItem header='Editing Names'>
          You can edit device names by clicking on them.
        </ListGroupItem>
      </ListGroup>
    </div>
  </div>

export default Devices