import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

function getIcon(deviceType) {
  switch(deviceType) {
  case 'xbee': return 'microchip'
  case 'dummy': return 'terminal'
  case 'tablet': return 'mobile-phone'
  default: return 'question'
  }
}

export const DeviceTypeIcon = ({ deviceType }) => (
  <FontAwesome name={getIcon(deviceType)} title={deviceType}/>
)

DeviceTypeIcon.propTypes = {
  deviceType: PropTypes.string.isRequired,
}

export default DeviceTypeIcon