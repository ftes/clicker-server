export const EDIT = 'clicker-xbee/device-name/EDIT'
export const FINISH = 'clicker-xbee/device-name/FINISH'

/**
 * Two hierarchy levels in one reducer, because on FINISH the
 * `list` state is set dependent on the `edit` state.
 */
export default function reducer(state = { list: {}, edit: {} }, action) {
  switch (action.type) {
  case FINISH: {
    if (action.cancelled) return {
      ...state,
      edit: {}
    }
    let deviceName = state.edit.deviceName
    // no entry was made in the input field -> use existing value from `list`
    if (deviceName === undefined) deviceName = state.list[state.edit.deviceKey]
    // empty name was set -> delete name
    if (deviceName === '') deviceName = undefined
    return {
      ...state,
      list: {
        ...state.list,
        [state.edit.deviceKey]: deviceName,
      },
      edit: {}
    }
  }
  case EDIT:
    return {
      ...state,
      edit: {
        deviceKey: action.deviceKey,
        deviceName: action.deviceName,
      }
    }
  default: return state
  }
}

export function edit(deviceKey, deviceName) {
  return { type: EDIT, deviceKey, deviceName }
}

export function finish(cancelled=false) {
  return { type: FINISH, cancelled }
}