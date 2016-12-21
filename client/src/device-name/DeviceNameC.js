import { connect } from 'react-redux'
import EditText from '../edit-text/EditTextC'
import { keyPrefix } from './'

const local = (state) => state.deviceNames

const mapStateToProps = (state, ownProps) => ({
  editKey: keyPrefix + ownProps.deviceKey,
  defaultText: local(state)[ownProps.deviceKey] ||
    state.devices[ownProps.deviceKey].deviceId,
})

const mapDispatchToProps = () => ({})

const DeviceNameC = connect(mapStateToProps, mapDispatchToProps)(EditText)

export default DeviceNameC