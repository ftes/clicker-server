import { connect } from 'react-redux'
import DeviceItem from './DraggableDeviceItem'
import { moveDevice } from './'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  moveDevice: (deviceKey, atDeviceKey) =>
    dispatch(moveDevice(deviceKey, atDeviceKey)),
})

const DraggableDeviceItemC =
  connect(mapStateToProps, mapDispatchToProps)(DeviceItem)

export default DraggableDeviceItemC