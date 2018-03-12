import { PRESS, PREFIX } from '../../websocket';
import questionReducer, { START, hasAnswered }
  from '../question';
import { getState as getParentState } from '../';

export const DELETE = 'clicker/questions/DELETE';

export function getState(state) {
  return getParentState(state).list;
}

export function getNextIdLocal(state) {
  return state
    .map(q => q.id)
    .reduce((max, i) => Math.max(max, i), 0)
    + 1;
}

export function getNextId(state) {
  return getNextIdLocal(getState(state));
}

export function getLastQuestion(state) {
  return state.slice(-1)[0];
}

export default function reducer(state = [], action) {
  switch (action.type) {
  // TODO NEW_LESSON isn't defined
  // case NEW_LESSON:
  //   return [
  //     ...state,
  //     questionReducer(undefined, action)
  //   ]
    case START: {
      return [
        ...state,
        questionReducer(undefined, {
          ...action,
          id: getNextIdLocal(state),
        }),
      ];
    }
    case PREFIX + PRESS: {
      const last = getLastQuestion(state);
      if (!last) return state;
      const newLast = questionReducer(last, action);
      if (last === newLast) return state;
      return [
        ...state.slice(0, -1),
        newLast,
      ];
    }
    case DELETE:
      return state.filter(q => q.id !== action.id);
    default: return state;
  }
}

export function deleteQuestion(id) {
  return { type: DELETE, id };
}

export function getQuestion(state, id) {
  return getState(state).find(q => q.id === id);
}

/**
 * Returns an array, one element per question.
 * 0 for non-answered, 1 for answered questions.
 */
export function getAnsweredVector(state, deviceKey) {
  return getState(state).map(q => (hasAnswered(q, deviceKey) ? 1 : 0));
}

export function getAnswered(state, deviceKey) {
  return getState(state).filter(q => hasAnswered(q, deviceKey));
}

export function getAnsweredCount(state, deviceKey) {
  return getAnswered(state, deviceKey).length;
}
