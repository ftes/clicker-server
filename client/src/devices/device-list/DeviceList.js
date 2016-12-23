import React, { PropTypes } from 'react'
import { Table, Button } from 'react-bootstrap'
import { isIgnored } from './'
import Device from '../device/DeviceC'
import { tabIndex as startTabIndex } from '../../core/globals'
import AnsweredIndicator from '../../questions/AnsweredIndicatorC'

import './DeviceList.css'

export function buildRows(devices, showSettings=false) {
  let row = []
  let rows = []
  for (let device of devices) {
    if (device.deviceType === 'newLine') {
      if (showSettings) row.push(device)
      rows.push(row)
      row = []
    } else {
      row.push(device)
    }
  }
  if (row.length > 0) rows.push(row)
  return rows
}

function getBgColor(state, pressed, device) {
  if (state.highlight && state.highlight.indexOf(device.deviceKey) !== -1)
    return 'orange'
  if (pressed[device.deviceKey]) return 'lightgrey'
  return 'white'
}

class DeviceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  tick() {
    let showdown = this.props.showdown
    if (showdown.length === 0) return

    let time = new Date().getTime()
    let step
    for (step of showdown) {
      if (step.time > time) break
    }
    if (this.state.highlight !== step.devices) {
      this.setState({ highlight: step.devices })
    }
    let lastStep = showdown.slice(-1)[0]
    if (step === lastStep) this.props.clearCallback()
    else setTimeout(() => this.tick(), 100)
  }

  componentWillReceiveProps() {
    // start ticking after having received new props
    setTimeout(() => this.tick())
  }
  
  render() {
    let { devices, editCallback, deleteCallback,
      showSettings, pressed } = this.props

    let rows = buildRows(devices, showSettings)
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
                  width: device.deviceType === 'newLine' ? '55px' : '100%',
                  backgroundColor: getBgColor(this.state, pressed, device)
                }}
              >
                <div style={{ display: 'flex' }}>
                <span
                  style={{ flexGrow: 1 }} //expand
                  title='Click to edit'
                  onFocus={() => editCallback(device.deviceKey)}
                  //make it focusable, but do not influence tab order
                  tabIndex={device.deviceType !== 'empty' ? '-1': null}
                >
                  <Device
                    {...device}
                    // the input field must have the proper tabIndex,
                    // because it will have the focus
                    tabIndex={isIgnored(device.deviceType) ? null : tabIndex++}
                  />
                </span>
                <span style={{ fontSize: '1.3em', marginRight: '20px' }}>
                  <AnsweredIndicator deviceKey={device.deviceKey}/>
                </span>
                {showSettings &&
                  <span>
                    <Button
                      bsSize='xsmall'
                      onClick={() => deleteCallback(device.deviceKey)}
                      title='Delete'
                    >
                      ✕
                    </Button>
                  </span>
                }
                </div>
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
  editCallback: PropTypes.func.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  showSettings: PropTypes.bool.isRequired,
  pressed: PropTypes.objectOf(PropTypes.bool).isRequired,
  showdown: PropTypes.array.isRequired,
  clearCallback: PropTypes.func.isRequired,
}

export default DeviceList