import { connect } from 'react-redux'
import DeviceList from './DeviceList'
import { edit } from '../../edit-text'
import { keyPrefix } from '../../device-name'
import { deleteDevice } from './'
import { getState as local } from './'
import { getState as showSettings } from '../../show-settings'
import { getState as buttonPress } from '../../button-press'

const mapStateToProps = (state) => ({
  devices: local(state),
  showSettings: showSettings(state),
  pressed: buttonPress(state),
})

const mapDispatchToProps = (dispatch) => ({
  editCallback: (deviceKey) => dispatch(edit(keyPrefix + deviceKey)),
  deleteCallback: (deviceKey) => dispatch(deleteDevice(deviceKey))
})

const DeviceListC = connect(mapStateToProps, mapDispatchToProps)(DeviceList)

export default DeviceListC