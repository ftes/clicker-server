import React from 'react'
import { PageHeader, ButtonToolbar } from 'react-bootstrap'
import RequestBatteryLevel from '../battery-level/RequestBatteryLevelC'
import DeviceList from '../devices/DeviceListC'
import AddNewLine from '../devices/AddNewLineC'
import AddEmpty from '../devices/AddEmptyC'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

let style = {
  fontFamily: 'Nunito Sans, sans-serif',
  padding: '0px 50px',
}

const App = () => (
  <div style={style}>
    <PageHeader>XBee Clicker App</PageHeader>
    <DeviceList/>
    <ButtonToolbar>
      <RequestBatteryLevel/>
      <AddNewLine/>
      <AddEmpty/>
    </ButtonToolbar>
  </div>
)

export default App
