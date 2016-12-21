import { connect } from 'react-redux'
import DeviceList from './DeviceList'
import { edit } from '../../device-name'

const local = (state) => state.devices

const mapStateToProps = (state) => ({
  devices: Object.values(local(state)),
})

const mapDispatchToProps = (dispatch) => ({
  editCallback: (deviceKey) => dispatch(edit(deviceKey)),
})

const DeviceListC = connect(mapStateToProps, mapDispatchToProps)(DeviceList)

export default DeviceListC