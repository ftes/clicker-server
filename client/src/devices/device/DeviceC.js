import { connect } from 'react-redux'
import Device from './Device'
import { getState as showSettings } from '../../show-settings'

const mapStateToProps = (state) => ({
  showSettings: showSettings(state),
})

const mapDispatchToProps = () => ({})

const DeviceC = connect(mapStateToProps, mapDispatchToProps)(Device)

export default DeviceC