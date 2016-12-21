import { connect } from 'react-redux'
import DeviceName from './DeviceName'
import { edit, finish } from './'

const local = (state) => state.devices.editDeviceName

function isEditing(state, ownProps) {
  return local(state).deviceKey === ownProps.deviceKey
}

const mapStateToProps = (state, ownProps) => ({
  edit: isEditing(state, ownProps),
  deviceName: isEditing(state, ownProps) ?
    local(state).deviceName : ownProps.deviceName,
})

const mapDispatchToProps = (dispatch) => ({
  editCallback: (deviceKey, deviceName) =>
    dispatch(edit(deviceKey, deviceName)),
  finishCallback: (cancelled, deviceKey, deviceName) =>
    dispatch(finish(cancelled, deviceKey, deviceName))
})

const DeviceNameC = connect(mapStateToProps, mapDispatchToProps)(DeviceName)

export default DeviceNameC