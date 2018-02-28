import _ from 'lodash'

/**
 * func(key, value, object, path): newValue
 */
export function deepApply(object, func, path=[]) {
  object = _.clone(object)
  _.forOwn(object, (value, key) => {
    func(key, value, object, [ ...path, key ])
    value = object[key] // re-fetch value in case it was changed by func
    if (_.isObjectLike(value)) {
      object[key] = deepApply(value, func, [ ...path, key ])
    }
  })
  return object
}

export function parseDates(object) {
  return deepApply(object, (key, value, object) => {
    if (key === 'date') {
      const parsed = new Date(value)
      if (!isNaN(parsed)) object[key] = parsed
    }
  })
}

export function deleteUndefined(object) {
  return deepApply(object, (key, value, object) => {
    if (value === undefined) {
      delete object[key]
    }
  })
}

/**
 * Lodash merge. 'undefined' values in overwrite are skipped.
 * Values that are true in shallow are not merged but copied.
 */
export function overwrite(object, overwriteWith, shallow={}) {
  object = _.merge({}, object, overwriteWith)
  object = deepApply(object, (key, value, object, path) => {
    const dotPath = path.join('.')
    if (_.get(shallow, dotPath) === true) {
      object[key] = _.get(overwriteWith, dotPath)
    }
  })
  return object
}

/**
 * Delete keys set in deleteWhereTrue.
 */
export function del(object, deleteWhereTrue) {
  object = deepApply(object, (key, value, object, path) => {
    if (_.get(deleteWhereTrue, path.join('.')) === true) {
      delete object[key]
    }
  })

  return object
}

/**
 * Preserve keys set in preserveWhereTrue.
 */
export function preserve(object, preserveWhereTrue) {
  object = deepApply(object, (key, value, object, path) => {
    if (_.get(preserveWhereTrue, path.join('.')) === undefined) {
      delete object[key]
    }
  })

  return object
}