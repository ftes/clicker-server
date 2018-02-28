import React, { PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '../common/devices/devices'
import Questions from '../common/questions/questions'
import { start as askQuestion } from '../common/questions/question'
import LocalStorage from '../common/save/local-storage'
import ClassName from '../common/class-name/class-name'

import Navbar from './navbar'
import Setting from '../common/components/setting'
import Hints from './hints'
import Websocket from '../common/websocket/teacher/websocket'
import { deleteOnLocalStorageSave } from '../core/reducers'
import { zIndex, tabIndex } from '../core/globals'

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
          <SDevices startTabIndex={tabIndex.devices}/>
          <Questions countdownZIndex={zIndex.countdown}/>
          <SHints/>
        </div>
        <LocalStorage deleteOnSave={deleteOnLocalStorageSave}/>
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