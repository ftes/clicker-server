import { START } from '../question'
import { getState as getParentState } from '../'

export { default as AskQuestion } from './ask-question'

export const EDIT_TITLE = 'clicker/questions/EDIT_TITLE'

export default function reducer(state = '', action) {
  switch (action.type) {
  case EDIT_TITLE:
    return action.title
  case START:
    return ''
  default: return state
  }
}

export function getState(state) {
  return getParentState(state).ask
}

export function editTitle(title) {
  return { type: EDIT_TITLE, title }
}