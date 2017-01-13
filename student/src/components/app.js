import React, { PropTypes } from 'react'
import { Subject } from 'rxjs'

import 'bootstrap/dist/css/bootstrap.css'

import Settings from '../settings/settings'
import Buttons from '../buttons/buttonsC'
import BatteryLevel from '../battery-level/battery-level'
import LocalStorage from '../save/local-storage'
import WebSocket from '../websocket/websocket'
import LoadSettings from '../settings/load-settings'

export class App extends React.Component {
  /**
   * On 5-click show settings.
   */
  componentDidMount() {
    const clickStream = new Subject()

    clickStream
      .bufferWhen(() => clickStream.debounceTime(200)) // 200ms
      .map(list => list.length)
      .filter(length => length === 5) // 5 clicks
      .subscribe(() => this.props.toggleShowSettings())

    this.clickStream = clickStream
  }

  onClick() {
    this.clickStream.next()
  }

  render() {
    const { showSettings } = this.props
    return (
      <div onClick={() => this.onClick()}>
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
      </div>
    )
  }
}

App.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  toggleShowSettings: PropTypes.func.isRequired,
}

export default App