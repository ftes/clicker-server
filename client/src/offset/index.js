export const INCREASE = 'clicker/offset/INCREASE'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case INCREASE: {
    let deviceKey = action.deviceKey
    let value = action.value
    return {
      ...state,
      [deviceKey]: (state[deviceKey] || 0) + value
    }
  }
  default: return state
  }
}

export function getState(state) {
  return state.offset
}

export function increase(deviceKey, value) {
  return { type: INCREASE, deviceKey, value }
}

export function getOffset(state, deviceKey) {
  return getState(state)[deviceKey] || 0
}