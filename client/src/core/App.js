import React from 'react'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '../devices/Devices'
import Navbar from '../components/Navbar'
import ClassName from '../class-name/ClassNameC'
import Hints from '../components/Hints'

import './App.css'

const App = () => (
  <div>
    <Navbar/>
    <div className='content'>
      <h3><ClassName/></h3>
      <Devices/>
      <Hints/>
    </div>
  </div>
)

export default App
