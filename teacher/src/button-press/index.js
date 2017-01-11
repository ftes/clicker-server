import { key } from '../common/device'
import { PREFIX } from '../common/websocket'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case PREFIX + '/press': {
    let data = action.payload
    data.pressed = data.pressed || undefined
    return {
      ...state,
      [key(data)]: data.pressed
    }
  }
  default: return state
  }
}

export function getState(state) {
  return state.buttonPress
}