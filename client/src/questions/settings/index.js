export const SETTING = 'clicker/questions/SETTING'

export default function reducer(state = {}, action) {
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