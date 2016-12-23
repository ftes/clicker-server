export const SETTING = 'clicker/questions/SETTING'
import { getState as getParentState } from '../'

export default function reducer(state = {
  durationMs: 5000,
  showdown: 'halves',
  showdownDurationMs: 5000,
}, action) {
  switch (action.type) {
  case SETTING:
    return {
      ...state,
      [action.key]: action.value
    }
  default: return state
  }
}

export function setting(key, value) {
  return { type: SETTING, key, value }
}

export function getState(state) {
  return getParentState(state).settings
}