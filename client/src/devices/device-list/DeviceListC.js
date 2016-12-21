import { connect } from 'react-redux'
import DeviceList from './DeviceList'
import { edit } from '../device-name'

const local = (state) => state.devices.deviceList

const mapStateToProps = (state) => ({
  devices: Object.values(local(state)),
})

const mapDispatchToProps = (dispatch) => ({
  editCallback: (deviceKey, deviceName) =>
    dispatch(edit(deviceKey, deviceName)),
})

const DeviceListC = connect(mapStateToProps, mapDispatchToProps)(DeviceList)

export default DeviceListC