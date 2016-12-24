import { SAVE as EDIT_TEXT_SAVE, isForMe } from '../../edit-text'
import { getState as getParentState } from '../'

export const editKeyPrefix = 'questions/settings/'
export const SAVE = 'questions/settings/SAVE'

const int = (val) => parseInt(val, 10)
const parsers = {
  durationMs: int,
  showdownDurationMs: int,
  randomN: int,
}

export default function reducer(state = {
  durationMs: 5000,
  showdown: 'halves',
  showdownDurationMs: 5000,
  randomN: 5,
}, action) {
  switch (action.type) {
  case EDIT_TEXT_SAVE:
  case SAVE: {
    if (!isForMe(action, editKeyPrefix)) return state
    let key = action.editKey.slice(editKeyPrefix.length)
    let value = key in parsers ? parsers[key](action.text) : action.text
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

export function save(key, text) {
  return { type: SAVE, editKey: editKeyPrefix + key, text }
}