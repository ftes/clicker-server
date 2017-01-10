import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { XBEE, DUMMY, WEBSITE } from '../../../../common/devices'

function getIcon(deviceType) {
  switch(deviceType) {
  case XBEE: return 'microchip'
  case DUMMY: return 'terminal'
  case WEBSITE: return 'mobile-phone'
  default: return 'question'
  }
}

const DeviceTypeIcon = ({ deviceType }) => (
  <FontAwesome name={getIcon(deviceType)} title={deviceType}/>
)

DeviceTypeIcon.propTypes = {
  deviceType: PropTypes.string.isRequired,
}

export default DeviceTypeIcon