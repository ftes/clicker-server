export const INCREASE = 'clicker/offset/INCREASE';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case INCREASE: {
      const { deviceKey, value } = action;

      return {
        ...state,
        [deviceKey]: (state[deviceKey] || 0) + value,
      };
    }
    default: return state;
  }
}

export function getState(state) {
  return state.offset;
}

export function increase(deviceKey, value) {
  return { type: INCREASE, deviceKey, value };
}

export function getOffset(state, deviceKey) {
  return getState(state)[deviceKey] || 0;
}
