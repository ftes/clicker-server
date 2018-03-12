import { START } from '../question';
import { getState as getParentState } from '../';
import { toServer } from '../../time-offset';

export const CLEAR = 'clicker/countdown/CLEAR';

export default function reducer(state = null, action) {
  switch (action.type) {
    case START:
      return toServer(new Date().getTime(), action.getState()) + action.durationMs;
    case CLEAR:
      return null;
    default: return state;
  }
}

export function getRemainingMs(end) {
  if (end === null) return undefined;
  const remainingMs = end - new Date().getTime();
  return remainingMs;
}

export function isActive(end) {
  const remainingMs = getRemainingMs(end);
  return remainingMs >= 0;
}

export function clear() {
  return { type: CLEAR };
}

export function getState(state) {
  return getParentState(state).countdown;
}
