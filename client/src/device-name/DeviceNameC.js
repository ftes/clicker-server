import { connect } from 'react-redux'
import DeviceName from './DeviceName'
import { edit, finish } from './'

const local = (state) => state.deviceNames

function isEditing(state, ownProps) {
  return local(state).edit.deviceKey === ownProps.deviceKey
}

function deviceName(state, ownProps) {
  if (isEditing(state, ownProps)) {
    let editedName = local(state).edit.deviceName
    if (editedName !== undefined) return editedName
  }
  return local(state).list[ownProps.deviceKey]
}

const mapStateToProps = (state, ownProps) => ({
  edit: isEditing(state, ownProps),
  deviceName: deviceName(state, ownProps),
})

const mapDispatchToProps = (dispatch) => ({
  editCallback: (deviceKey, deviceName) =>
    dispatch(edit(deviceKey, deviceName)),
  finishCallback: (cancelled) => dispatch(finish(cancelled))
})

const DeviceNameC = connect(mapStateToProps, mapDispatchToProps)(DeviceName)

export default DeviceNameC