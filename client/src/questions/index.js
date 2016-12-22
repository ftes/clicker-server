import { combineReducers } from 'redux'
import { BUTTON_EVENT } from '../../../common/websocket'
import list from './question-list'
import settings from './settings'
import countdown, { isActive } from './countdown'

const combined = combineReducers({
  settings,
  list,
  countdown,
})

function reducer(state = {}, action) {
  // filter out button press if question is not active
  if (action.type === BUTTON_EVENT && ! isActive(state.countdown)) return state

  return combined(state, action)
}

export default reducer