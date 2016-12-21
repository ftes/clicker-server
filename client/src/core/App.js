import React from 'react'
import { PageHeader } from 'react-bootstrap'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '../devices/Devices'

let style = {
  fontFamily: 'Nunito Sans, sans-serif',
  padding: '0px 50px',
}

const App = () => (
  <div style={style}>
    <PageHeader>XBee Clicker App</PageHeader>
    <Devices />
  </div>
)

export default App
