import { isForMe, SAVE } from '../edit-text'

export { default as Dropdown } from './dropdown'
export { default as Text } from './text'
export { default as SettingsItem } from './settings-item'
export { default as Radio } from './radio'

export const int = (val) => parseInt(val, 10)

export function reduce(editKeyPrefix, action, state, defaultState, parsers) {
  if (!isForMe(action, editKeyPrefix)) return state
  let key = action.editKey.slice(editKeyPrefix.length)
  let value = action.text
  if (value === '') value = defaultState[key]
  else value = key in parsers ? parsers[key](action.text) : action.text
  return {
    ...state,
    [key]: value
  }
}

export function save(editKeyPrefix, key, text) {
  return { type: SAVE, editKey: editKeyPrefix + key, text }
}