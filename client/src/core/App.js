import React from 'react'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

import Devices from '../devices/Devices'
import Navbar from '../components/Navbar'

let style = {
  fontFamily: 'Nunito Sans, sans-serif',
  padding: '0px 50px',
}

const App = () => (
  <div style={style}>
    <Navbar/>
    <Devices/>
  </div>
)

export default App
