import { SAVE, isForMe } from '../edit-text'
import { keyPrefix } from './edit-mapping'

export default function(state = {}, action) {
  switch (action.type) {
  case SAVE: {
    if (!isForMe(action, keyPrefix)) return state
    let mappedId = action.text
    let deviceKey = action.editKey.slice(keyPrefix.length)
    // empty mapping was set -> delete mapping
    if (mappedId === '') mappedId = undefined
    return {
      ...state,
      [deviceKey]: mappedId,
    }
  }
  default: return state
  }
}

export function getMappedId(state, deviceKey) {
  return state[deviceKey]
}

export function getState(state) {
  return state.idMappings
}