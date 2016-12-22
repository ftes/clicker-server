import { SAVE, isForMe } from '../edit-text'

export const editTextKey = 'className'

const reducer = (state = 'class', action) => {
  switch (action.type) {
  case SAVE:
    if (!isForMe(action, editTextKey)) return state
    return action.text || 'class'
  default: return state
  }
}

export default reducer