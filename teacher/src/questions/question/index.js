import { PRESS } from '../../common/message-types'
import { PREFIX } from '../../common/websocket'
import { key } from '../../common/device'

export const START = 'clicker/questions/START'
export const NEW_LESSON = 'clicker/questions/NEW_LESSON'

function create(id, title, isLesson) {
  let answeredBy = isLesson ? undefined : []
  let date = new Date()
  return { isLesson, id, title, answeredBy, date }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
  case PREFIX + PRESS: {
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
    // id and title set by parent reducer
    return create(action.id, action.title || `Question ${action.id}`, false)
  case NEW_LESSON:
    return create(action.id, action.title, true)
  default: return state
  }
}

export function start() {
  return { type: START }
}

export function newLesson(title) {
  return { type: NEW_LESSON, title }
}