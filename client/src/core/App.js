import React from 'react'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '../devices/Devices'
import Navbar from '../components/Navbar'

import './App.css'

const App = () => (
  <div>
    <Navbar/>
    <div className='content'>
      <Devices/>
    </div>
  </div>
)

export default App
