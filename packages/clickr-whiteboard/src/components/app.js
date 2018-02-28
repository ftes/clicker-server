import React from 'react'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '../common/devices/devices'
import Questions from '../common/questions/questions'
import ClassName from '../common/class-name/class-name'
import Setting from '../common/components/setting'

import Websocket from '../common/websocket/teacher/websocket'
import { zIndex, tabIndex } from '../core/globals'

import './app.css'

// Component
const SDevices = Setting(Devices)

const App = () => (
  <div>
    <div>
      <h3><ClassName/></h3>
      <SDevices startTabIndex={tabIndex.devices}/>
      <Questions countdownZIndex={zIndex.countdown}/>
    </div>
    <Websocket/>
  </div>
)

export default App