import { connect } from 'react-redux'
import EditText from '../edit-text/edit-text'
import { editKey } from './'
import { getDevice } from '../devices/device-list'
import { getState as local } from './'

function getCustomized(state, ownProps) {  
  const customized = [
    local(state)[ownProps.deviceKey],
    state.idMappings[ownProps.deviceKey],
    ownProps.deviceId
  ]

  return customized.find(c => c !== undefined)
}

export function getName(state, deviceKey) {
  let deviceId = getDevice(state, deviceKey).deviceId
  return getCustomized(state, { deviceKey, deviceId })
}

const mapStateToProps = (state, ownProps) => ({
  editKey: editKey(ownProps.deviceKey),
  defaultText: getCustomized(state, ownProps),
  icon: getCustomized(state, ownProps, true),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EditText)