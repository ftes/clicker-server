import { combineReducers } from 'redux'
import list from './question-list'
import settings from './settings'

export default combineReducers({
  settings,
  list,
})