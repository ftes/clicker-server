import halves from './halves'
import { getState as getParentState } from '../'

export const START = 'clicker/showdown/START'
export const CLEAR = 'clicker/showdown/CLEAR'

export const functions = {
  halves
}

export default function reducer(state = [], action) {
  switch(action.type) {
  case START: {
    let func = functions[action.settings.showdown]
    let lastQuestion = action.lastQuestion
    if (lastQuestion && lastQuestion.answeredBy.length > 0) {
      let answeredBy = action.lastQuestion.answeredBy
      let selected = answeredBy[Math.floor(Math.random() * answeredBy.length)]
      return func(action.settings.durationMs, action.devices, selected)
    }
    return state
  }
  case CLEAR:
    return []
  default: return state
  }
}

export function start(devices) {
  return { type: START, devices }
}

export function clear() {
  return { type: CLEAR }
}

export function getState(state) {
  return getParentState(state).showdown
}