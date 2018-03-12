import { key as getKey } from '../../util/device';
import { PRESS } from '../../websocket/message-types';
import { PREFIX } from '../../websocket';

export const ADD_EMPTY = 'clicker/devices/ADD_EMPTY';

export default function reducer(state = undefined, action) {
  switch (action.type) {
  // add device upon button press
    case PREFIX + PRESS: {
      const data = action.payload;
      const { deviceType, deviceId } = data;
      const deviceKey = getKey(data);
      return {
        deviceType,
        deviceId,
        deviceKey,
      };
    }
    case ADD_EMPTY: {
      const deviceType = 'empty';
      const deviceKey = `${deviceType}/${action.deviceId}`;
      return {
        deviceKey,
        deviceType,
        deviceId: `${action.deviceId}`,
      };
    }
    default: return state;
  }
}

export function addEmpty() {
  return { type: ADD_EMPTY };
}
