import { combineReducers } from 'redux'
import deviceList from './device-list'
import editDeviceName from './device-name'

const reducer = combineReducers({
  deviceList,
  editDeviceName,
})

export default reducer