import React from 'react'
import RequestBatteryLevel from '../battery-level/RequestBatteryLevelC'
import DeviceList from '../devices/DeviceListC'

const App = () => (
  <div>
    <DeviceList/>
    <RequestBatteryLevel/>
  </div>
)

export default App
