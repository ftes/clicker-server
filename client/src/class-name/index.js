import { SAVE, isForMe } from '../edit-text'

export const editTextKey = 'className'

export default function (state = 'class', action) {
  switch (action.type) {
  case SAVE:
    if (!isForMe(action, editTextKey)) return state
    return action.text || 'class'
  default: return state
  }
}

export function getState(state) {
  return state.className
}