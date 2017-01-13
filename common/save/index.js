import _ from 'lodash'

export const OVERWRITE = 'clicker/save/OVERWRITE'

export function overwrite(state) {
  return { type: OVERWRITE, state }
}

export function parseDates(state) {
  _.forOwn(state, (value, key) => {
    if (_.isObjectLike(value)) {
      state[key] = parseDates(value)
    } else if (key === 'date') {
      const parsed = new Date(value)
      if (!isNaN(parsed)) state[key] = parsed
    }
  })
  return state
}