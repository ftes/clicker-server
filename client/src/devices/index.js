import { combineReducers } from 'redux'
import list from './device-list'
import showdown, { START } from './showdown'

const combined = combineReducers({
  list,
  showdown,
})

export default function reduce(state = {}, action) {
  if (action.type === START) action.devices = state.list
  return combined(state, action)
}

export function getState(state) {
  return state.devices
}