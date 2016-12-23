import { SAVE, isForMe } from '../../edit-text'
import { getState as getParentState } from '../'

export const editKeyPrefix = 'questions/settings/'

export default function reducer(state = {
  durationMs: 5000,
  showdown: 'halves',
  showdownDurationMs: 5000,
}, action) {
  switch (action.type) {
  case SAVE: {
    if (!isForMe(action, editKeyPrefix)) return state
    let value = parseInt(action.text, 10)
    let key = action.editKey.slice(editKeyPrefix.length)
    // empty value was set => use default
    if (value === '') value = undefined
    return {
      ...state,
      [key]: value
    }
  }
  default: return state
  }
}

export function getState(state) {
  return getParentState(state).settings
}