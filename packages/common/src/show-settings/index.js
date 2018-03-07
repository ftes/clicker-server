export const TOGGLE = 'clicker/clean-mode/TOGGLE'

export { default as ShowSettings } from './show-settings'

export const initialState = true
const reducer = (state = initialState, action) => {
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