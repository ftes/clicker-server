import React, { PropTypes } from 'react'

import 'bootstrap/dist/css/bootstrap.css'

import Navbar from './navbarC'
import Settings from '../settings/settingsC'
import Buttons from '../buttons/buttonsC'
import console from '../common/console'
import zIndex from '../util/z-index'

import './app.css'

class App extends React.Component {
  /**
   * Read from local storage on start.
   * Write to local storage on end.
   * Get Device UUID.
   * Fetch default settings.
   */
  componentWillMount() {
    try {
      let state = JSON.parse(localStorage.getItem('redux-state'))
      if (state) this.props.setState(state)
    } catch (error) {
      window.alert('Could not read state from browser storage.')
      console.error(error)
    }

    window.addEventListener('beforeunload', () => {
      let state = { ...this.props.state }
      let json = JSON.stringify(state)
      localStorage.setItem('redux-state', json)
    })

    if (window.device) this.props.setDeviceId(window.device.uuid)

    this.props.fetchDefaultSettings(this.props.state)
    this.props.connectWebsocket(this.props.state)
  }

  render() {
    const { showSettings } = this.props
    return (
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
      </div>
    )
  }
}

App.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  setDeviceId: PropTypes.func.isRequired,
  fetchDefaultSettings: PropTypes.func.isRequired,
  connectWebsocket: PropTypes.func.isRequired,
}


export default App