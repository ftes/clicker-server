import React, { PropTypes } from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import DeviceItem from './DeviceItemC'

/**
 * based on https://github.com/tc/react-dnd-table-example
 */

let Types = {
  DEVICE: 'device'
}

const deviceSource = {
  beginDrag: function (props) {
    let deviceKey = props.device.deviceKey
    return { deviceKey }
  }
}

const deviceTarget = {
  hover: function (props, monitor) {
    let deviceKey = monitor.getItem().deviceKey
    let atDeviceKey = props.device.deviceKey

    if (deviceKey !== atDeviceKey) {
      props.moveDevice(deviceKey, atDeviceKey)
    }
  }
}

let sourceCollect = function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

let targetCollect = function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const DraggableDeviceItem = (props) => {
  let { connectDragSource, connectDropTarget } = props

  return connectDragSource(connectDropTarget(
    <div
      style={{
        width: '100%',
        height: '100%',
        cursor: 'move',
        display: 'inline-block' // to get 100% height
      }}
    >
      <DeviceItem {...props} />
    </div>
  ))
}

DraggableDeviceItem.propTypes = {
  moveDevice: PropTypes.func.isRequired,

  // injected by react-dnd
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}

const source =
  DragSource(Types.DEVICE, deviceSource, sourceCollect)(DraggableDeviceItem)
const target = DropTarget(Types.DEVICE, deviceTarget, targetCollect)(source)

export default target