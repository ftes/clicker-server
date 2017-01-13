import { connect } from 'react-redux'
import EditText from '../edit-text/edit-text'
import { keyPrefix } from './'
import { getDevice } from '../devices/device-list'
import { getState as local } from './'

function getCustomized(state, ownProps, icon=false) {
  if (icon && ! state.showSettings) return null
  
  // return most customized value, in descending order
  let customName = local(state)[ownProps.deviceKey]
  let mappedId = state.idMappings[ownProps.deviceKey]
  let deviceId = ownProps.deviceId

  if (customName) return icon ? 'user-o' : customName
  if (mappedId) return icon ? 'edit' : mappedId
  return icon ? 'gear' : deviceId
}

export function getName(state, deviceKey) {
  let deviceId = getDevice(state, deviceKey).deviceId
  return getCustomized(state, { deviceKey, deviceId })
}

const mapStateToProps = (state, ownProps) => ({
  editKey: keyPrefix + ownProps.deviceKey,
  defaultText: getCustomized(state, ownProps),
  icon: getCustomized(state, ownProps, true),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EditText)