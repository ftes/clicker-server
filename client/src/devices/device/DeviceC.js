import { connect } from 'react-redux'
import Device from './Device'
import { getState as batteryLevel } from '../../battery-level'
import { getState as showSettings } from '../../show-settings'

const mapStateToProps = (state, props) => ({
  batteryLevel: batteryLevel(state)[props.deviceKey],
  showSettings: showSettings(state),
})

const mapDispatchToProps = () => ({})

const DeviceC = connect(mapStateToProps, mapDispatchToProps)(Device)

export default DeviceC