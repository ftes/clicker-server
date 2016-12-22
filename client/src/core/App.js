import React, { PropTypes } from 'react'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '../devices/Devices'
import Questions from '../questions/QuestionsC'
import Navbar from '../components/Navbar'
import ClassName from '../class-name/ClassNameC'
import Hints from '../components/Hints'
import console from '../util/console'

import './App.css'

class App extends React.Component {
  /**
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
      localStorage.setItem('redux-state', JSON.stringify(this.props.getState()))
    })
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className='content'>
          <h3><ClassName/></h3>
          <Devices/><hr/>
          <Questions/><hr/>
          <Hints/>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  setState: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
}

export default App
