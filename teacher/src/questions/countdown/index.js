import { START } from '../question'
import { getState as getParentState } from '../'

export const CLEAR = 'clocker/countdown/CLEAR'

export default function reducer(state = null, action) {
  switch (action.type) {
  case START:
    return new Date().getTime() + action.durationMs
  case CLEAR:
    return null
  default: return state
  }
}

export function getRemainingMs(end) {
  if (end === null) return undefined
  return end - new Date().getTime()
}

export function isActive(end) {
  return getRemainingMs(end) >= 0
}

export function clear() {
  return { type: CLEAR }
}

export function getState(state) {
  return getParentState(state).countdown
}