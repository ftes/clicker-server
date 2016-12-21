import { BUTTON_EVENT, BATTERY_LEVEL_RESPONSE }
  from '../../../../common/websocket'
import deviceReducer, { ADD_NEW_LINE, ADD_EMPTY } from '../device'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case BATTERY_LEVEL_RESPONSE:
  case BUTTON_EVENT:
  case ADD_NEW_LINE:
  case ADD_EMPTY: {
    let device = deviceReducer(state[action.deviceKey], action)
    if (!device) return state
    return {
      ...state,
      [device.deviceKey]: device
    }
  }
  default: return state
  }
}