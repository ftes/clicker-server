import { BUTTON_EVENT } from '../../../common/websocket'
import { key } from '../util/device'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case BUTTON_EVENT: {
    let data = action.payload
    return {
      ...state,
      [key(data)]: data.pressed
    }
  }
  default: return state
  }
}