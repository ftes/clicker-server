import { combineReducers } from 'redux';
import { PRESS } from '../websocket/message-types';
import { PREFIX } from '../websocket';
import list, { getLastQuestion } from './question-list';
import settings from './settings';
import countdown, { isActive } from './countdown';
import showdown, { START as START_SHOWDOWN } from './showdown';
import { START as START_QUESTION } from './question';
import ask from './ask-question';

export { default as Questions } from './questions';
export { startQuestion } from './question';
export { AskQuestion } from './ask-question';
export { Showdown } from './showdown';
export { clear as clearCountdown } from './countdown';
export { getState as getQuestionListState, getAnsweredCount, getAnsweredVector } from './question-list';

const combined = combineReducers({
  settings,
  list,
  countdown,
  showdown,
  ask,
});

export default function reducer(state = {}, action) {
  // filter out button press if question is not active
  if (action.type === PREFIX + PRESS && !isActive(state.countdown)) {
    return state;
  }

  const { settings: { durationMs } } = state; // for showdown
  if (action.type === START_SHOWDOWN) {
    const lastQuestion = getLastQuestion(state.list); // for showdown
    Object.assign(action, { settings, lastQuestion });
  }
  if (action.type === START_QUESTION) {
    const title = state.ask; // for question
    Object.assign(action, { durationMs, title });
  }

  return combined(state, action);
}

export function getState(state) {
  return state.questions;
}
