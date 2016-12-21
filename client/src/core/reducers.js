import { combineReducers } from 'redux'
import batteryLevel from '../battery-level'
import buttonPress from '../button-press'
import devices from '../devices'
import deviceNames from '../device-name'

const app = combineReducers({
  batteryLevel,
  buttonPress,
  devices,
  deviceNames,
})

export default app
