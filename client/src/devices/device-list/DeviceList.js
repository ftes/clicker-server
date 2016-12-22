import React, { PropTypes } from 'react'
import { Table, Button } from 'react-bootstrap'
import { isIgnored } from '../'
import Device from '../device/DeviceC'
import { tabIndex as startTabIndex } from '../../core/globals'

import './DeviceList.css'

const DeviceList = ({ devices, editCallback, deleteCallback,
  showSettings }) => {
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
              }}
            >
              <span
                style={{
                  display: showSettings ? 'table-cell' : null,
                  width: '100%'
                }}
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
              {showSettings &&
                <span style={{ display: 'table-cell' }}>
                  <Button
                    bsSize='xsmall'
                    onClick={() => deleteCallback(device.deviceKey)}
                    title='Delete'
                  >
                    ✕
                  </Button>
                </span>
              }
            </td>
          )}
          </tr>
        )}
      </tbody>
    </Table>
  )
}

DeviceList.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape({
    deviceType: PropTypes.string.isRequired,
    deviceId: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  editCallback: PropTypes.func.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  showSettings: PropTypes.bool.isRequired,
}

export default DeviceList