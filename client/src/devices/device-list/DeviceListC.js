import { connect } from 'react-redux'
import DeviceList from './DeviceList'
import { edit } from '../../edit-text'
import { keyPrefix } from '../../device-name'
import { deleteDevice } from './'

const local = (state) => state.devices

const mapStateToProps = (state) => ({
  devices: local(state),
  showSettings: state.showSettings,
  pressed: state.buttonPress,
})

const mapDispatchToProps = (dispatch) => ({
  editCallback: (deviceKey) => dispatch(edit(keyPrefix + deviceKey)),
  deleteCallback: (deviceKey) => dispatch(deleteDevice(deviceKey))
})

const DeviceListC = connect(mapStateToProps, mapDispatchToProps)(DeviceList)

export default DeviceListC