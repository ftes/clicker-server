import React, { PropTypes } from 'react'

const ReqeustBatteryLevel = ({ requestBatteryLevel }) => (
  <button onClick={requestBatteryLevel}>
    Update Battery Levels
  </button>
)

ReqeustBatteryLevel.propTypes = {
  requestBatteryLevel: PropTypes.func,
}

export default ReqeustBatteryLevel