import { key } from '../util/device';
import { PREFIX, publish } from '../websocket';
import { BATTERY_REQUEST, BATTERY_RESPONSE } from '../websocket/message-types';

export { default as BatteryLevel } from './battery-level';
export { default as RequestBatteryLevel } from './request-battery-level';

export const REQUEST = 'clicker/battery-level/REQUEST';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case REQUEST:
      return {}; // remove cached battery levels
    case PREFIX + BATTERY_RESPONSE: {
      const data = action.payload;
      return {
        ...state,
        [key(data)]: data.level,
      };
    }
    default: return state;
  }
}

export function request() {
  publish(BATTERY_REQUEST);
  return { type: REQUEST };
}

export function getState(state) {
  return state.batteryLevel;
}
