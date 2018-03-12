import _ from 'lodash';

/**
 * func(key, value, object, path): newValue
 */
export function deepApply(object, func, path = []) {
  const clonedObject = _.clone(object);
  _.forOwn(clonedObject, (value, key) => {
    func(key, value, clonedObject, [...path, key]);
    const clonedValue = clonedObject[key]; // re-fetch value in case it was changed by func
    if (_.isObjectLike(value)) {
      clonedObject[key] = deepApply(clonedValue, func, [...path, key]);
    }
  });
  return clonedObject;
}

export function parseDates(object) {
  return deepApply(object, (key, value, obj) => {
    if (key === 'date') {
      const parsed = new Date(value);
      // eslint-disable-next-line no-param-reassign
      if (!Number.isNaN(parsed)) obj[key] = parsed;
    }
  });
}

export function deleteUndefined(object) {
  return deepApply(object, (key, value, obj) => {
    if (value === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
    }
  });
}

/**
 * Lodash merge. 'undefined' values in overwrite are skipped.
 * Values that are true in shallow are not merged but copied.
 */
export function overwrite(object, overwriteWith, shallow = {}) {
  const mergedObject = _.merge({}, object, overwriteWith);
  return deepApply(mergedObject, (key, value, obj, path) => {
    const dotPath = path.join('.');
    if (_.get(shallow, dotPath) === true) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = _.get(overwriteWith, dotPath);
    }
  });
}

/**
 * Delete keys set in deleteWhereTrue.
 */
export function del(object, deleteWhereTrue) {
  return deepApply(object, (key, value, obj, path) => {
    if (_.get(deleteWhereTrue, path.join('.')) === true) {
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
    }
  });
}

/**
 * Preserve keys set in preserveWhereTrue.
 */
export function preserve(object, preserveWhereTrue) {
  return deepApply(object, (key, value, obj, path) => {
    if (_.get(preserveWhereTrue, path.join('.')) === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
    }
  });
}
