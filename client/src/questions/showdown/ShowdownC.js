import { connect } from 'react-redux'
import Showdown from './Showdown'
import { start } from './'
import { getState as deviceList } from '../../devices/device-list'

const mapStateToProps = (state) => ({
  devices: deviceList(state),
})

const mapDispatchToProps = (dispatch) => ({
  startCallback: (devices) => dispatch(start(devices)),
  label: 'Showdown',
  faIcon: 'play',
})

const ShowdownC = connect(mapStateToProps, mapDispatchToProps)(Showdown)

export default ShowdownC