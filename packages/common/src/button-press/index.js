import { key } from '../util/device'
import { PREFIX } from '../websocket'
import { PRESS } from '../websocket/message-types'

export { default as ButtonPress } from './button-press'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case PREFIX + PRESS: {
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

export function press(deviceType, deviceId, pressed) {
  return { type: PREFIX + PRESS, payload: { deviceType, deviceId, pressed } }
}