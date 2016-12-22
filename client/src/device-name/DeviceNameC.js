import { connect } from 'react-redux'
import EditText from '../edit-text/EditTextC'
import { keyPrefix } from './'
import { getDevice } from '../devices/index'

const local = (state) => state.deviceNames

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
  let deviceId = getDevice(state.devices, deviceKey).deviceId
  return getCustomized(state, { deviceKey, deviceId })
}

const mapStateToProps = (state, ownProps) => ({
  editKey: keyPrefix + ownProps.deviceKey,
  defaultText: getCustomized(state, ownProps),
  icon: getCustomized(state, ownProps, true),
})

const mapDispatchToProps = () => ({})

const DeviceNameC = connect(mapStateToProps, mapDispatchToProps)(EditText)

export default DeviceNameC