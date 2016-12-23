import { combineReducers } from 'redux'
import { BUTTON_EVENT } from '../../../common/websocket'
import list, { getLastQuestion } from './question-list'
import settings from './settings'
import countdown, { isActive } from './countdown'
import showdown, { START } from './showdown'

const combined = combineReducers({
  settings,
  list,
  countdown,
  showdown,
})

export default function reducer(state = {}, action) {
  // filter out button press if question is not active
  if (action.type === BUTTON_EVENT && ! isActive(state.countdown)) return state
  if (action.type === START) {
    let settings = state.settings
    let lastQuestion = getLastQuestion(state.list)
    Object.assign(action, { settings, lastQuestion })
  }

  return combined(state, action)
}

export function getState(state) {
  return state.questions
}