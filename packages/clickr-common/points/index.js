import { getOffset } from '../offset'
import { getAnsweredCount } from '../questions/question-list'

export function getPoints(state, deviceKey) {
  return getAnsweredCount(state, deviceKey) + getOffset(state, deviceKey)
}