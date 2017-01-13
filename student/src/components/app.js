import React, { PropTypes } from 'react'

import 'bootstrap/dist/css/bootstrap.css'

import Settings from '../settings/settings'
import Buttons from '../buttons/buttonsC'
import BatteryLevel from '../battery-level/battery-level'
import LocalStorage from '../save/local-storage'
import WebSocket from '../websocket/websocket'
import LoadSettings from '../settings/load-settings'
import FiveClick from '../settings/five-click'
import Insomnia from './insomnia'

export const App = ({ showSettings }) => (
  <FiveClick>
    <div className='content' style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}>
      {showSettings &&
        <Settings/>
      }
      {!showSettings &&
        <Buttons/>
      }
    </div>
    <LoadSettings/>
    <BatteryLevel/>
    <LocalStorage/>
    <WebSocket/>
    <Insomnia/>
  </FiveClick>
)

App.propTypes = {
  showSettings: PropTypes.bool.isRequired,
}

export default App