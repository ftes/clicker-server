import { SAVE } from '../../edit-text';
import { getState as getParentState } from '../';
import { int, reduce } from '../../abstract-settings';

export { SettingsComponent as Settings } from './settings';

export const editKeyPrefix = 'devices/settings/';

const parsers = {
  rowWidth: int,
  fontSizeNames: int,
  fontSizePoints: int,
};

const defaultState = {
  rowWidth: 8,
  fontSizeNames: 16,
  fontSizePoints: 20,
  hideNonCustomNames: false,
  showButtonPress: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SAVE: {
      return reduce(editKeyPrefix, action, state, defaultState, parsers);
    }
    default: return state;
  }
}

export function getState(state) {
  return getParentState(state).settings;
}
