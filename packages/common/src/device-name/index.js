import { SAVE, isForMe } from '../edit-text';

export { default as DeviceName, getName } from './device-name';

export const keyPrefix = 'deviceName/';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SAVE: {
      if (!isForMe(action, keyPrefix)) return state;
      let deviceName = action.text;
      const deviceKey = action.editKey.slice(keyPrefix.length);
      // empty name was set -> delete name
      if (deviceName === '') deviceName = undefined;
      return {
        ...state,
        [deviceKey]: deviceName,
      };
    }
    default: return state;
  }
}

export function getState(state) {
  return state.deviceNames;
}

export function editKey(deviceKey) {
  return keyPrefix + deviceKey;
}
