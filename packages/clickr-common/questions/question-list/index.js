import { PRESS } from '../../websocket/message-types'
import { PREFIX } from '../../websocket'
import questionReducer, { START, NEW_LESSON, hasAnswered }
  from '../question'
import { getState as getParentState } from '../'

export const DELETE = 'clicker/questions/DELETE'

export default function reducer(state = [], action) {
  switch (action.type) {
  case NEW_LESSON:
    return [
      ...state,
      questionReducer(undefined, action)
    ]
  case START: {
    action.id = getNextIdLocal(state)
    let newQuestion = questionReducer(undefined, action)
    return [
      ...state,
      newQuestion
    ]
  }
  case PREFIX + PRESS: {
    let last = getLastQuestion(state)
    if (! last) return state
    let newLast = questionReducer(last, action)
    if (last === newLast) return state
    return [
      ...state.slice(0, -1),
      newLast,
    ]
  }
  case DELETE:
    return state.filter(q => q.id !== action.id)
  default: return state
  }
}

export function deleteQuestion(id) {
  return { type: DELETE, id }
}

export function getNextId(state) {
  return getNextIdLocal(getState(state))
}

export function getNextIdLocal(state) {
  return state
    .map(q => q.id)
    .reduce((max, i) => Math.max(max, i), 0)
    + 1
}

export function getQuestion(state, id) {
  return getState(state).find(q => q.id === id)
}

export function getLastQuestion(state) {
  return state.slice(-1)[0]
}

export function getState(state) {
  return getParentState(state).list
}

/**
 * Returns an array, one element per question.
 * 0 for non-answered, 1 for answered questions.
 */
export function getAnsweredVector(state, deviceKey) {
  return getState(state).map(q => hasAnswered(q, deviceKey) ? 1 : 0)
}

export function getAnswered(state, deviceKey) {
  return getState(state).filter(q => hasAnswered(q, deviceKey))
}

export function getAnsweredCount(state, deviceKey) {
  return getAnswered(state, deviceKey).length
}