import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import Device from '../device/DeviceC'
import './DeviceList.css'

const DeviceList = ({ devices, editCallback }) => {
  let row = []
  let rows = []
  for (let device of devices) {
    if (device.deviceType === 'newLine') {
      rows.push(row)
      row = []
    } else {
      row.push(device)
    }
  }
  if (row.length > 0) rows.push(row)
  let rowIndex = 0
  let tabIndex = 1

  return (
    <Table responsive bordered>
      <tbody>
        {rows.map(row =>
          <tr key={rowIndex++}>
          {row.map(device =>
            <td
              key={device.deviceKey}
              onFocus={() => editCallback(device.deviceKey)}
              //make it focusable, but do not influence tab order
              tabIndex={device.deviceType !== 'empty' ? '-1': null}
              title='Click to edit'
            >
              <Device
                {...device}
                // the input field must have the proper tabIndex,
                // because it will have the focus
                tabIndex={tabIndex++}
              />
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
}

export default DeviceList