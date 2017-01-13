import { BATTERY_REQUEST, BATTERY_RESPONSE } from '../common/message-types'
import { PREFIX, publish } from '../common/websocket'

export const SET = 'clicker/battery-level/SET'

const initialState = null
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET:
    return action.level
  case PREFIX + BATTERY_REQUEST:
    publish(BATTERY_RESPONSE, { level: state })
    return state
  default: return state
  }
}

export default reducer

export function set(level) {
  return { type: SET, level }
}

export function getState(state) {
  return state.batteryLevel
}