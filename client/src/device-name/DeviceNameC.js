import { connect } from 'react-redux'
import DeviceName from './DeviceName'
import { edit, finish } from './'

function isEditing(state, ownProps) {
  return state.editDeviceName.editing &&
    state.editDeviceName.deviceKey === ownProps.deviceKey
}

const mapStateToProps = (state, ownProps) => ({
  edit: isEditing(state, ownProps),
  deviceName: isEditing(state, ownProps) ?
    state.editDeviceName.deviceName :
    ownProps.deviceName,
})

const mapDispatchToProps = (dispatch) => ({
  editCallback: (deviceKey, deviceName) =>
    dispatch(edit(deviceKey, deviceName)),
  finishCallback: (cancelled, deviceKey, deviceName) =>
    dispatch(finish(cancelled, deviceKey, deviceName))
})

const DeviceNameC = connect(mapStateToProps, mapDispatchToProps)(DeviceName)

export default DeviceNameC