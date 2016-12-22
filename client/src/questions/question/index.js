import { BUTTON_EVENT } from '../../../../common/websocket'
import { key } from '../../util/device'

export const START = 'clicker/questions/START'
export const FINISH = 'clicker/questions/FINISH'

export default function reducer(state = {}, action) {
  switch (action.type) {
  case BUTTON_EVENT: {
    let data = action.payload
    if (! state.active || ! data.pressed) return state
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
      active: true,
      title: action.title,
      answeredBy: []
    }
  case FINISH:
    return {
      ...state,
      active: undefined,
    }
  default: return state
  }
}

export function start(title, id) {
  return { type: START, title, id }
}

export function finish(id) {
  return { type: FINISH, id }
}