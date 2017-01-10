import { connect } from 'react-redux'
import DeviceList from './DeviceList'
import { getState as local } from './'
import { getState as buttonPress } from '../../button-press'
import { getState as showdown } from '../../questions/showdown'
import { getState as settings } from '../settings'

const mapStateToProps = (state) => ({
  devices: local(state),
  pressed: buttonPress(state),
  showdown: showdown(state),
  settings: settings(state),
})

const mapDispatchToProps = () => ({})

const DeviceListC = connect(mapStateToProps, mapDispatchToProps)(DeviceList)

export default DeviceListC