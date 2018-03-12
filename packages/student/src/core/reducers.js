import { combineReducers } from 'redux';
import { PRESS } from '@clickr/common/lib/websocket';
import saveReducer from '@clickr/common/lib/save';

import settings from '../settings';
import buttons, { PRESS as PRESS_INTERNAL } from '../buttons';
import { publish } from '../websocket';
import batteryLevel from '../battery-level';

const reducers = combineReducers({
  settings,
  buttons,
  batteryLevel,
});

export const deleteOnSave = {
  buttons: true,
  batteryLevel: true,
};

const coreReducer = (state = {}, action) => {
  const reducedState = saveReducer(state, action);
  if (action.type === PRESS_INTERNAL) {
    const { pressed } = action;
    publish(PRESS, { pressed }, reducedState, action.number);
  }
  return reducers(reducedState, action);
};

export default coreReducer;
