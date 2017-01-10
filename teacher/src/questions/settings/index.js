import { SAVE } from '../../edit-text'
import { getState as getParentState } from '../'
import { int, reduce } from '../../abstract-settings'

export const editKeyPrefix = 'questions/settings/'

const parsers = {
  durationMs: int,
  showdownDurationMs: int,
  randomN: int,
}

const defaultState = {
  durationMs: 5000,
  showdown: 'halves',
  showdownDurationMs: 5000,
  randomN: 5,
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
  case SAVE: {
    return reduce(editKeyPrefix, action, state, defaultState, parsers)
  }
  default: return state
  }
}

export function getState(state) {
  return getParentState(state).settings
}