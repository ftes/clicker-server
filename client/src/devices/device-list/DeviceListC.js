import { connect } from 'react-redux'
import DeviceList from './DeviceList'

const local = (state) => state.devices.deviceList

const mapStateToProps = (state) => ({
  devices: Object.values(local(state)),
})

const mapDispatchToProps = () => ({})

const DeviceListC = connect(mapStateToProps, mapDispatchToProps)(DeviceList)

export default DeviceListC