import { connect } from 'react-redux'
import Device from './Device'

const mapStateToProps = (state, props) => ({
  pressed: state.buttonPress[props.deviceKey],
  batteryLevel: state.batteryLevel[props.deviceKey],
})

const mapDispatchToProps = () => ({})

const DeviceC = connect(mapStateToProps, mapDispatchToProps)(Device)

export default DeviceC