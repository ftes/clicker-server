import React from 'react';
import PropTypes from 'prop-types';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import DeviceItem from './device-item';
import { moveDevice } from './';


// Component
/**
 * based on https://github.com/tc/react-dnd-table-example
 */

const Types = {
  DEVICE: 'device',
};

const deviceSource = {
  beginDrag(props) {
    const { deviceKey } = props.device;
    return { deviceKey };
  },
};

const deviceTarget = {
  hover(props, monitor) {
    const { deviceKey } = monitor.getItem();
    const atDeviceKey = props.device.deviceKey;

    if (deviceKey !== atDeviceKey) {
      props.moveDevice(deviceKey, atDeviceKey);
    }
  },
};

const sourceCollect = (cnct, monitor) => ({
  connectDragSource: cnct.dragSource(),
  isDragging: monitor.isDragging(),
});

const targetCollect = cnct => ({
  connectDropTarget: cnct.dropTarget(),
});

const DraggableDeviceItem = (props) => {
  const { connectDragSource, connectDropTarget } = props;

  const dom = (
    <div
      style={{
        width: '100%',
        height: '100%',
        cursor: 'move',
        display: 'inline-block', // to get 100% height
      }}
    >
      <DeviceItem {...props} />
    </div>
  );

  return connectDragSource(connectDropTarget(dom));
};

DraggableDeviceItem.propTypes = {
  moveDevice: PropTypes.func.isRequired,

  // injected by react-dnd
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

const source =
  dragSource(Types.DEVICE, deviceSource, sourceCollect)(DraggableDeviceItem);
const target = dropTarget(Types.DEVICE, deviceTarget, targetCollect)(source);

// Container
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  moveDevice: (deviceKey, atDeviceKey) =>
    dispatch(moveDevice(deviceKey, atDeviceKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(target);
