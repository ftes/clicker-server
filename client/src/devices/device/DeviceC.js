import { connect } from 'react-redux'
import Device from './Device'

const mapStateToProps = (state, props) => ({
  batteryLevel: state.batteryLevel[props.deviceKey],
  showSettings: state.showSettings,
})

const mapDispatchToProps = () => ({})

const DeviceC = connect(mapStateToProps, mapDispatchToProps)(Device)

export default DeviceC