export const START = 'clicker/questions/START'
export const FINISH = 'clicker/questions/FINISH'

export default function reducer(state = [], action) {
  switch (action.type) {
  case START:
    return [
      ...state,
      {
        active: true,
        devices: {}
      }
    ]
  case FINISH: {
    let last = state.slice(-1)[0]
    return [
      ...state.slice(0, -1),
      {
        ...last,
        active: false,
      }
    ]
  }
  default: return state
  }
}

export function start() {
  return { type: START }
}

export function finish() {
  return { type: FINISH }
}