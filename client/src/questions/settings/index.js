export const SETTING = 'clicker/questions/SETTING'

export default function reducer(state = { durationMs: 5000 }, action) {
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