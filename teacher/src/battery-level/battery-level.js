import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import { getState as local } from './'

// COMPONENT
function convertToText(level) {
  if (level === undefined) return 'question'
  if (level < 0.125) return 'battery-empty'
  if (level < 0.375) return 'battery-quarter'
  if (level < 0.625) return 'battery-half'
  if (level < 0.875) return 'battery-three-quarters'
  return 'battery-full'
}

let style = {
  fontSize: '0.8em'
}

export const BatteryLevel = ({ batteryLevel, showPercent }) => {
  let percent = '?'
  if (batteryLevel !== undefined) percent = (batteryLevel * 100).toFixed(0) + '%'
  return (
    <span
      style={{
        ...style,
        color: batteryLevel < 0.125 || batteryLevel === undefined ?
          'red' : 'black',
        textAlign: 'center',

      }}
      title={percent}
    >
      <FontAwesome
        name={convertToText(batteryLevel)}
      />
      &nbsp;
      {showPercent && percent}
    </span>
  )
}

BatteryLevel.propTypes = {
  batteryLevel: PropTypes.number,
  showPercent: PropTypes.bool,
}

// CONTAINER
const mapStateToProps = (state, ownProps) => ({
  batteryLevel: local(state)[ownProps.deviceKey]
})

const mapDispatchToProps = () => ({})

const BatteryLevelC = connect(mapStateToProps, mapDispatchToProps)(BatteryLevel)
BatteryLevelC.propTypes = {
  deviceKey: PropTypes.string.isRequired,
}
export default BatteryLevelC