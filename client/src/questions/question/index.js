import { BUTTON_EVENT } from '../../../../common/websocket'
import { key } from '../../util/device'

export const START = 'clicker/questions/START'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case BUTTON_EVENT: {
    let data = action.payload
    if (! data.pressed) return state
    let deviceKey = key(data)
    let alreadyAnswered = state.answeredBy.find(d => d === deviceKey)
    if (alreadyAnswered) return state
    return {
      ...state,
      answeredBy: [
        ...state.answeredBy,
        deviceKey
      ]
    }
  }
  case START:
    return {
      id: action.id,
      title: action.title,
      answeredBy: []
    }
  default: return state
  }
}

export function start(title, id, durationMs) {
  return { type: START, title, id, durationMs }
}