import { BUTTON_EVENT } from '../../../../common/websocket'
import questionReducer, { START, FINISH, finish } from '../question'

export const DELETE = 'clicker/questions/DELETE'

export default function reducer(state = [], action) {
  switch (action.type) {
  case START: {
    let last = state.slice(-1)[0]
    if (last && last.active) {
      last = questionReducer(last, finish(last.id))
      state = [
        ...state.slice(0, -1),
        last
      ]
    }
    return [
      ...state,
      questionReducer(undefined, action)
    ]
  }
  case FINISH: {
    let oldQ = getQuestion(state, action.id)
    if (! oldQ) return state
    let oldIndex = state.indexOf(oldQ)
    let newQ = questionReducer(oldQ, action)
    return [
      ...state.slice(0, oldIndex),
      newQ,
      ...state.slice(oldIndex + 1)
    ]
  }
  case BUTTON_EVENT: {
    let last = state.slice(-1)[0]
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
  return state
    .map(q => q.id)
    .reduce((max, i) => Math.max(max, i), 0)
    + 1
}

export function getQuestion(state, id) {
  return state.find(q => q.id === id)
}