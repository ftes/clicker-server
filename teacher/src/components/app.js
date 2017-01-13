import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'
import { start as askQuestion } from '../questions/question'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '../devices/devices'
import Questions from '../questions/questions'
import Navbar from './navbar'
import Setting from './setting'
import ClassName from '../class-name/class-name'
import Hints from './hints'
import LocalStorage from '../common/save/local-storage'
import Websocket from '../websocket/websocket'

import './app.css'

// Component
const SNavbar = Setting(Navbar)
const SDevices = Setting(Devices)
const SHints = Setting(Hints)

const keyMap = {
  askQuestion: 'ctrl+enter',
}

export class App extends React.Component {
  render() {
    const keyHandlers = {
      askQuestion: () => this.props.askQuestion()
    }

    return (
      <HotKeys keyMap={keyMap} handlers={keyHandlers}>
        <SNavbar/>
        <div className='content'>
          <h3><ClassName/></h3>
          <SDevices/>
          <Questions/>
          <SHints/>
        </div>
        <LocalStorage/>
        <Websocket/>
      </HotKeys>
    )
  }
}

App.propTypes = {
  askQuestion: PropTypes.func.isRequired,
}

// CONTAINER
const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  askQuestion: () => dispatch(askQuestion()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)