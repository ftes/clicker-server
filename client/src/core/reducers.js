import { combineReducers } from 'redux'
import batteryLevel from '../battery-level'
import buttonPress from '../button-press'
import devices from '../devices'

const app = combineReducers({
  batteryLevel,
  buttonPress,
  devices,
})

export default app
