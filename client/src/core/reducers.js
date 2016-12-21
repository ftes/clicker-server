import { combineReducers } from 'redux'
import batteryLevel from '../battery-level'
import buttonPress from '../button-press'
import devices from '../devices'
import editDeviceName from '../device-name'

const app = combineReducers({
  batteryLevel,
  buttonPress,
  devices,
  editDeviceName,
})

export default app
