import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import Device from '../device/DeviceC'
import './DeviceList.css'

const DeviceList = ({ devices }) => {
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
  let i = 0

  return (
    <Table responsive bordered>
      <tbody>
        {rows.map(row =>
          <tr key={i++}>
          {row.map(device =>
            <td key={device.deviceKey}><Device {...device}/></td>
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

}

export default DeviceList