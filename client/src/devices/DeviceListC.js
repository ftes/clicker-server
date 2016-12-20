import { connect } from 'react-redux'
import DeviceList from './DeviceList'

const mapStateToProps = (state) => ({
  devices: Object.values(state.devices),
})

const mapDispatchToProps = () => ({})

const DeviceListC = connect(mapStateToProps, mapDispatchToProps)(DeviceList)

export default DeviceListC