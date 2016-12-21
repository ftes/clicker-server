import { SAVE } from '../edit-text'

export const editTextKey = 'className'

const reducer = (state = 'class', action) => {
  switch (action.type) {
  case SAVE:
    if (action.cancelled || action.editKey !== editTextKey) return state
    return action.text || 'class'
  default: return state
  }
}

export default reducer