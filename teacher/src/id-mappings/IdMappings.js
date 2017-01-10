import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import EditMapping from './EditMappingC'
import { tabIndex as startTabIndex } from '../core/globals'

const IdMappings = ({ mappings, editMapping, devices }) => {
  let tabIndex = startTabIndex.idMappings

  return (
    <Table responsive striped condensed>
      <thead>
        <tr>
          <th>Type</th>
          <th>ID</th>
          <th>Display as (click to edit)</th>
        </tr>
      </thead>
      <tbody>
        {devices.map(device =>
          <tr key={device.deviceKey}>
            <td>{device.deviceType}</td>
            <td>{device.deviceId}</td>
            <td
              tabIndex='-1'
              onFocus={() => editMapping(device.deviceKey)}
              title='Click to edit.'
            >
              <EditMapping
                deviceKey={device.deviceKey}
                deviceId={device.deviceId}
                mappedId={mappings[device.deviceKey]}
                tabIndex={tabIndex++}
              />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

IdMappings.propTypes = {
  mappings: PropTypes.objectOf(PropTypes.string).isRequired,
  editMapping: PropTypes.func.isRequired,
  devices: PropTypes.arrayOf(PropTypes.shape({
    deviceKey: PropTypes.string.isRequired,
    deviceType: PropTypes.string.isRequired,
    deviceId: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

export default IdMappings