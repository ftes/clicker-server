import { GIT_UPDATES_REQUEST, GIT_UPDATES_RESPONSE, GIT_PULL,
  GIT_PULL_RESPONSE } from '../../../common/websocket'
import { emit } from '../util/websocket'

const initialState = {
  behindCommits: 0,
  checkRequestPending: false,
  updateSuccessful: true,
  updateRequestPending: false,
}

export const CHECK_UPDATES = 'clicker/updates/CHECK'
export const UPDATE = 'clicker/updates/UPDATE'

const reducer= (state = initialState, action) => {
  switch (action.type) {
  case CHECK_UPDATES:
    emit(GIT_UPDATES_REQUEST)
    return {
      ...state,
      checkRequestPending: true,
    }
  case GIT_UPDATES_RESPONSE:
    return {
      ...state,
      checkRequestPending: false,
      behindCommits: 1 || action.payload.behindCommits
    }
  case UPDATE:
    emit(GIT_PULL)
    return {
      ...state,
      updateRequestPending: true,
    }
  case GIT_PULL_RESPONSE:
    return {
      ...state,
      updateRequestPending: false,
      updateSuccessful: action.payload.success,
      behindCommits: action.payload.success ? 0 : state.behindCommits,
    }
  default: return state
  }
}

export default reducer

export function getState(state) {
  return state.updates
}

export function update() {
  return { type: UPDATE }
}

export function checkUpdates() {
  return { type : CHECK_UPDATES }
}