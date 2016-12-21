export const EDIT = 'clicker/class-name/EDIT'
export const FINISH = 'clicker/class-name/FINISH'

const reducer = (state = { name: 'class' }, action) => {
  switch (action.type) {
  case EDIT:
    return {
      ...state,
      tmp: action.name || state.name
    }
  case FINISH:
    if (action.cancelled) return {
      ...state,
      tmp: undefined,
    }
    return {
      ...state,
      tmp: undefined,
      name: state.tmp
    }
  default: return state
  }
}

export default reducer

export function edit(name) {
  return { type: EDIT, name }
}

export function finish(cancelled=false) {
  return { type: FINISH, cancelled }
}