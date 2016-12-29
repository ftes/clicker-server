import { combineReducers } from 'redux'
import { BUTTON_EVENT } from '../../../common/websocket'
import list, { getLastQuestion, getNextIdLocal } from './question-list'
import settings from './settings'
import countdown, { isActive } from './countdown'
import showdown, { START as START_SHOWDOWN } from './showdown'
import { START as START_QUESTION } from './question'
import ask from './ask-question'

const combined = combineReducers({
  settings,
  list,
  countdown,
  showdown,
  ask,
})

export default function reducer(state = {}, action) {
  // filter out button press if question is not active
  if (action.type === BUTTON_EVENT && ! isActive(state.countdown)) return state

  if (action.type === START_SHOWDOWN) {
    let settings = state.settings // for showdown
    let lastQuestion = getLastQuestion(state.list) // for showdown
    Object.assign(action, { settings, lastQuestion })
  }
  if (action.type === START_QUESTION) {
    let durationMs = state.settings.durationMs // for showdown
    let id = getNextIdLocal(state.list) // for question
    let title = state.ask // for question
    Object.assign(action, { durationMs, id, title })
  }

  return combined(state, action)
}

export function getState(state) {
  return state.questions
}