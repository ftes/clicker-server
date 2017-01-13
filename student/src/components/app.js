import React, { PropTypes } from 'react'

import 'bootstrap/dist/css/bootstrap.css'

import Navbar from './navbarC'
import Settings from '../settings/settings'
import Buttons from '../buttons/buttonsC'
import zIndex from '../util/z-index'
import BatteryLevel from '../battery-level/battery-level'
import LocalStorage from '../save/local-storage'
import WebSocket from '../websocket/websocket'
import LoadSettings from '../settings/load-settings'

import './app.css'

const component = ({ showSettings }) => (
  <div>
    <Navbar style={{ zIndex: zIndex.navbar }}/>
    <div className='content'>
      {showSettings &&
        <Settings/>
      }
      {!showSettings &&
        <Buttons style={{ zIndex: zIndex.content }}/>
      }
    </div>
    <LoadSettings/>
    <BatteryLevel/>
    <LocalStorage/>
    <WebSocket/>
  </div>
)

component.propTypes = {
  showSettings: PropTypes.bool.isRequired,
}

export default component