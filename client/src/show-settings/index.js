export const TOGGLE = 'clicker/clean-mode/TOGGLE'

const reducer = (state = true, action) => {
  switch (action.type) {
  case TOGGLE:
    return !state
  default: return state
  }
}

export default reducer

export function toggle() {
  return { type: TOGGLE }
}

export function getState(state) {
  return state.showSettings
}