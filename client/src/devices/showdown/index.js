import halves from './halves'
import { getState as getParentState } from '../'

export const START = 'clicker/showdown/START'

const functions = {
  halves
}

export default function reducer(state = [], action) {
  switch(action.type) {
  case START: {
    let func = functions[action.function]
    return func(action.durationMs)
  }
  default: return state
  }
}

export function getState(state) {
  return getParentState(state).list
}