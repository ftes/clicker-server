import React, { PropTypes } from 'react'
import Device from './DeviceC'

const DeviceList = ({ devices }) => (
  <div>
    {devices.map(device =>
      <Device key={device.deviceKey} {...device}/>
    )}
  </div>
)

DeviceList.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape({
    deviceType: PropTypes.string.isRequired,
    deviceId: PropTypes.string.isRequired,
  }).isRequired).isRequired,

}

export default DeviceList