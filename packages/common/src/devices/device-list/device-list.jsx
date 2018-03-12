import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import _ from 'lodash';
import { DragDropContext as dragDropContext } from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';

import DraggableDeviceItem from './draggable-device-item';
import { getState as local, isShown } from './';
import { getState as buttonPress } from '../../button-press';
import { getState as getShowdownState } from '../../questions/showdown';
import { getState as getSettingsState } from '../settings';
import { hasAnswered } from '../../questions/question';
import { getLastQuestion, getState as questionList }
  from '../../questions/question-list';
import { toClient } from '../../time-offset';

import './device-list.css';

// Component
const defaultState = { highlight: [] };

export function buildRows(devices, rowWidth) {
  return _.chunk(devices, rowWidth);
}

function getBgColor(
  componentState, pressed, device, question,
  settings, state,
) {
  const { deviceKey } = device;
  if (!isShown(device, state)) return 'white';
  if (componentState.highlight &&
    componentState.highlight.indexOf(deviceKey) !== -1) { return componentState.isLastStep ? 'orange' : 'yellow'; }
  if (settings.showButtonPress && pressed[deviceKey]) return 'lightgrey';
  if (question && hasAnswered(question, deviceKey)) return 'lightgreen';
  return 'white';
}

export class DeviceListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentWillReceiveProps() {
    // start ticking after having received new props
    setTimeout(() => this.tick());
  }

  tick() {
    const { showdown } = this.props;
    if (showdown.length === 0) {
      this.setState(defaultState);
      return;
    }

    const time = new Date().getTime();
    const matchingStep = showdown.find((step) => {
      const stepTime = toClient(step.time, this.props.state);
      return (stepTime > time);
    }) || showdown.slice(-1).pop();

    if (this.state.highlight !== matchingStep.devices) {
      this.setState({ highlight: matchingStep.devices });
    }
    const lastStep = showdown.slice(-1)[0];
    const isLastStep = matchingStep === lastStep;
    this.setState({ isLastStep });
    if (!isLastStep) setTimeout(() => this.tick(), 100);
  }

  render() {
    const {
      devices, pressed, question, settings, state,
      startTabIndex,
    } = this.props;

    const rows = buildRows(devices, this.props.settings.rowWidth);
    let rowIndex = 0;
    const tabIndex = startTabIndex;

    return (
      <Table responsive bordered>
        <tbody>
          {rows.map(row => (
            <tr key={rowIndex++}>
              {row.map(device => (
                <td
                  key={device.deviceKey}
                  style={{
                    backgroundColor:
                      getBgColor(
  this.state, pressed, device,
                        question, settings, state,
  ),
                    overflow: 'hidden',
                    padding: '0px',
                  }}
                >
                  <DraggableDeviceItem
                    device={device}
                    tabIndex={tabIndex}
                  />
                </td>))}
            </tr>))}
        </tbody>
      </Table>
    );
  }
}

DeviceListComponent.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape({
    deviceType: PropTypes.string.isRequired,
    deviceId: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  pressed: PropTypes.objectOf(PropTypes.bool).isRequired,
  showdown: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  question: PropTypes.object,
  state: PropTypes.object.isRequired,
  startTabIndex: PropTypes.number.isRequired,
};

DeviceListComponent.defaultProps = {
  question: {},
};

export const DeviceListDragDrop = dragDropContext(Html5Backend)(DeviceListComponent);

// Container
const mapStateToProps = state => ({
  devices: local(state),
  pressed: buttonPress(state),
  showdown: getShowdownState(state),
  settings: getSettingsState(state),
  question: getLastQuestion(questionList(state)),
  state,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListDragDrop);
