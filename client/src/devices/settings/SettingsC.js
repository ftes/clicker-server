import { connect } from 'react-redux'
import Settings from './Settings'
import { getState as showSettings } from '../../show-settings'
import { getState as local } from './'

const mapStateToProps = (state) => ({
  settings: local(state),
  showSettings: showSettings(state),
})

const mapDispatchToProps = () => ({})

const SettingsC = connect(mapStateToProps, mapDispatchToProps)(Settings)

export default SettingsC