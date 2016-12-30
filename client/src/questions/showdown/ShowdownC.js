import { connect } from 'react-redux'
import Showdown from './Showdown'
import { start } from './'
import { getState as deviceList } from '../../devices/device-list'
import { getState as devicesSettings } from '../../devices/settings'

const mapStateToProps = (state) => ({
  devices: deviceList(state),
  devicesSettings: devicesSettings(state),
})

const mapDispatchToProps = (dispatch) => ({
  startCallback: (devices, settings) => dispatch(start(devices, settings)),
  label: 'Pick',
  faIcon: 'play',
})

const ShowdownC = connect(mapStateToProps, mapDispatchToProps)(Showdown)

export default ShowdownC