import { combineReducers } from 'redux'
import { PRESS } from '../common/message-types'
import { PREFIX } from '../common/websocket'
import list, { getLastQuestion } from './question-list'
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
  if (action.type === PREFIX + PRESS && ! isActive(state.countdown)) return state

  if (action.type === START_SHOWDOWN) {
    let settings = state.settings // for showdown
    let lastQuestion = getLastQuestion(state.list) // for showdown
    Object.assign(action, { settings, lastQuestion })
  }
  if (action.type === START_QUESTION) {
    let durationMs = state.settings.durationMs // for showdown
    let title = state.ask // for question
    Object.assign(action, { durationMs, title })
  }

  return combined(state, action)
}

export function getState(state) {
  return state.questions
}