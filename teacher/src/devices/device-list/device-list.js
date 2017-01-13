import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import _ from 'lodash'
import { DragDropContext } from 'react-dnd'
import Html5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'

import { tabIndex as startTabIndex } from '../../core/globals'
import DraggableDeviceItem from './draggable-device-item'
import { getState as local } from './'
import { getState as buttonPress } from '../../button-press'
import { getState as showdown } from '../../questions/showdown'
import { getState as settings } from '../settings'
import { hasAnswered } from '../../questions/question'
import { getLastQuestion, getState as questionList }
  from '../../questions/question-list'

import './device-list.css'

// Component
const defaultState = { highlight: [] }

export function buildRows(devices, rowWidth) {
  return _.chunk(devices, rowWidth)
}

function getBgColor(state, pressed, deviceKey, question) {
  if (state.highlight && state.highlight.indexOf(deviceKey) !== -1)
    return state.isLastStep ? 'orange' : 'yellow'
  if (pressed[deviceKey]) return 'lightgrey'
  if (question && hasAnswered(question, deviceKey)) return 'lightgreen'
  return 'white'
}

export class DeviceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
  }

  tick() {
    let showdown = this.props.showdown
    if (showdown.length === 0) {
      this.setState(defaultState)
      return
    }

    let time = new Date().getTime()
    let step
    for (step of showdown) {
      if (step.time > time) break
    }
    if (this.state.highlight !== step.devices) {
      this.setState({ highlight: step.devices })
    }
    let lastStep = showdown.slice(-1)[0]
    let isLastStep = step === lastStep
    this.setState({ isLastStep })
    if (! isLastStep) setTimeout(() => this.tick(), 100)
  }

  componentWillReceiveProps() {
    // start ticking after having received new props
    setTimeout(() => this.tick())
  }
  
  render() {
    let { devices, pressed, question } = this.props

    let rows = buildRows(devices, this.props.settings.rowWidth)
    let rowIndex = 0
    let tabIndex = startTabIndex.devices

    return (
      <Table responsive bordered>
        <tbody>
          {rows.map(row =>
            <tr key={rowIndex++}>
            {row.map(device =>
              <td
                key={device.deviceKey}
                style={{
                  backgroundColor:
                    getBgColor(this.state, pressed, device.deviceKey, question),
                  overflow: 'hidden',
                  padding: '0px',
                }}
              >
                <DraggableDeviceItem
                  device={device}
                  tabIndex={tabIndex}
                />
              </td>
            )}
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

DeviceList.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape({
    deviceType: PropTypes.string.isRequired,
    deviceId: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  pressed: PropTypes.objectOf(PropTypes.bool).isRequired,
  showdown: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  question: PropTypes.object,
}

export const DeviceListDragDrop = DragDropContext(Html5Backend)(DeviceList)

// Container
const mapStateToProps = (state) => ({
  devices: local(state),
  pressed: buttonPress(state),
  showdown: showdown(state),
  settings: settings(state),
  question: getLastQuestion(questionList(state)),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListDragDrop)