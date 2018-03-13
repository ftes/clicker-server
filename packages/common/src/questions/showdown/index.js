import halves from './halves';
import random from './random';
import { getState as getParentState } from '../';
import { START as NEW_QUESTION, onlyShown } from '../../questions/question';
import { toServer } from '../../time-offset';

export { default as Showdown } from './showdown';

export const START = 'clicker/showdown/START';

export const functions = {
  halves,
  random,
};

export default function reducer(state = [], action) {
  switch (action.type) {
    case START: {
      const func = functions[action.settings.showdown];
      const { lastQuestion: { answeredBy = [] } } = action;
      if (answeredBy.length > 0) {
        const answeredByShown = onlyShown(answeredBy, action.getState());
        const selected = answeredByShown[Math.floor(Math.random() * answeredByShown.length)];
        return func(
          action.settings, action.devices, selected, answeredByShown,
          action.devicesSettings, t => toServer(t, action.getState()),
        );
      }
      return state;
    }
    case NEW_QUESTION:
    // clear old winner when new question arrives
      return [];
    default: return state;
  }
}

export function start(devices, devicesSettings) {
  return { type: START, devices, devicesSettings };
}

export function getState(state) {
  return getParentState(state).showdown;
}
