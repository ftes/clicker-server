import { connect } from 'react-redux'
import Settings from './Settings'
import { getState as local } from './'
import { getState as showSettings } from '../../show-settings'

const mapStateToProps = (state) => ({
  durationMs: local(state).durationMs,
  showdownDurationMs: local(state).showdownDurationMs,
  showSettings: showSettings(state),
})

const mapDispatchToProps = () => ({})

const SettingsC = connect(mapStateToProps, mapDispatchToProps)(Settings)

export default SettingsC