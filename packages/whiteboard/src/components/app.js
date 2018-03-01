import React from 'react'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '@clickr/common/lib/devices/devices'
import Questions from '@clickr/common/lib/questions/questions'
import ClassName from '@clickr/common/lib/class-name/class-name'
import Setting from '@clickr/common/lib/components/setting'

import Websocket from '@clickr/common/lib/websocket/teacher/websocket'
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