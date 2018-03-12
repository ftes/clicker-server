export const EDIT = 'clicker-xbee/edit-text/EDIT';
export const SAVE = 'clicker-xbee/edit-text/SAVE';
export const CLOSE = 'clicker-xbee/edit-text/CLOSE';

/**
 * Two hierarchy levels in one reducer, because on SAVE the
 * `list` state is set dependent on the `edit` state.
 */
export default function reducer(state = {}, action) {
  switch (action.type) {
    case CLOSE:
      return {
        ...state,
        editKey: undefined,
        text: undefined,
      };
    case EDIT:
      return {
        ...state,
        editKey: action.editKey,
        text: action.text,
      };
    default: return state;
  }
}

export function edit(editKey, text) {
  return { type: EDIT, editKey, text };
}

export function save(editKey, text, cancelled = false) {
  return {
    type: SAVE, editKey, text, cancelled,
  };
}

export function close() {
  return { type: CLOSE };
}

export function isForMe(action, keyPrefix) {
  return action.editKey.startsWith(keyPrefix) && !action.cancelled;
}

export function getState(state) {
  return state.editText;
}
