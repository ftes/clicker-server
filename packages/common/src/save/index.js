import _ from 'lodash';
import { parseDates, preserve } from '../util/js-object';

export { default as LocalStorage } from './local-storage';

export const LOAD = 'clicker/save/LOAD';
export const RESET = 'clicker/save/RESET';


export default function reducer(state = {}, action, preserveWhereTrue = {}) {
  switch (action.type) {
    case LOAD: {
    // e.g. null or undefined
      if (!action.state) return state;

      const loadedState = parseDates(action.state);
      // use lodash merge (js-object.overwrite crashes)
      return _.merge({}, state, loadedState);
    }
    case RESET:
      return preserve(state, preserveWhereTrue);
    default: return state;
  }
}

export function reset() {
  return { type: RESET };
}

export function load(state) {
  return { type: LOAD, state };
}
