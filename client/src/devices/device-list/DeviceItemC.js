import { connect } from 'react-redux'
import DeviceItem from './DeviceItem'
import { deleteDevice } from './'
import { getState as showSettings } from '../../show-settings'

const mapStateToProps = (state) => ({
  showSettings: showSettings(state),
})

const mapDispatchToProps = (dispatch) => ({
  deleteCallback: (deviceKey) => dispatch(deleteDevice(deviceKey)),
})

const DeviceItemC =
  connect(mapStateToProps, mapDispatchToProps)(DeviceItem)

export default DeviceItemC