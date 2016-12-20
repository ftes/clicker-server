import React, { PropTypes } from 'react'

const BatteryLevel = ({ batteryLevel }) => (
  <span>
    battery: {batteryLevel !== undefined ?
      (batteryLevel * 100).toFixed(2) : '?'}%
  </span>
)

BatteryLevel.propTypes = {
  batteryLevel: PropTypes.number,
}

export default BatteryLevel