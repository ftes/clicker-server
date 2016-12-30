import { combineReducers } from 'redux'
import list from './device-list'
import settings from './settings'

const reducer = combineReducers({
  list,
  settings,
})

export default reducer

export function getState(state) {
  return state.devices
}