import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '../devices/Devices'
import Questions from '../questions/QuestionsC'
import Navbar from '../components/Navbar'
import ShowSettingsDependent from '../components/ShowSettingsDependentC'
import ClassName from '../class-name/ClassNameC'
import Hints from '../components/Hints'
import console from '../common/console'

import './App.css'

const NavbarC = ShowSettingsDependent(Navbar)
const DevicesC = ShowSettingsDependent(Devices)
const HintsC = ShowSettingsDependent(Hints)

const keyMap = {
  askQuestion: 'ctrl+enter',
}

class App extends React.Component {
  /**
   * Connect to websocket.
   * Read from local storage on start.
   * Write to local storage on end.
   */
  componentDidMount() {
    try {
      let state = JSON.parse(localStorage.getItem('redux-state'))
      if (state) this.props.setState(state)
    } catch (error) {
      window.alert('Could not read state from browser storage.')
      console.error(error)
    }

    window.addEventListener('beforeunload', () => {
      let copy = { ...this.props.state }
      // delete state that should not be cached between browser sessions
      delete copy.websocket
      localStorage.setItem('redux-state', JSON.stringify(copy))
    })
    
    this.props.connectWebsocket(this.props.state.websocket)
  }

  render() {
    const keyHandlers = {
      askQuestion: () => this.props.askQuestion()
    }

    return (
      <HotKeys keyMap={keyMap} handlers={keyHandlers}>
        <NavbarC/>
        <div className='content'>
          <h3><ClassName/></h3>
          <DevicesC/>
          <Questions/>
          <HintsC/>
        </div>
      </HotKeys>
    )
  }
}

App.propTypes = {
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  askQuestion: PropTypes.func.isRequired,
  connectWebsocket: PropTypes.func.isRequired,
}

export default App
