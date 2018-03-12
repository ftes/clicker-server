import { combineReducers } from 'redux';

import buttonPress from '@clickr/common/lib/button-press';
import devices from '@clickr/common/lib/devices';
import deviceNames from '@clickr/common/lib/device-name';
import className from '@clickr/common/lib/class-name';
import questions from '@clickr/common/lib/questions';
import idMappings from '@clickr/common/lib/id-mappings';
import offset from '@clickr/common/lib/offset';
import lessons from '@clickr/common/lib/lessons';
import { syncLogicBefore, notifyServerOnSyncStatusChange } from '@clickr/common/lib/sync';
import timeOffset from '@clickr/common/lib/time-offset';

const reducers = combineReducers({
  buttonPress,
  devices,
  deviceNames,
  className,
  questions,
  idMappings,
  offset,
  lessons,
  timeOffset,
  sync: () => true,
  editText: () => ({}),
  showSettings: () => false,
});

const coreReducer = (state = {}, action) => {
  const stateAfterSyncLogicBefore = syncLogicBefore(state, action);
  const reducedState = reducers(stateAfterSyncLogicBefore, action);
  // omit syncLogicAfter (that would publish state)
  notifyServerOnSyncStatusChange(reducedState, action);
  return reducedState;
};

export default coreReducer;
