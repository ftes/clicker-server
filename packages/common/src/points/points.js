import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getPoints } from './'

// Component
export const Points = ({ points, style }) => (
  <span style={style}>{points}</span>
)

Points.propTypes = {
  points: PropTypes.number.isRequired, // provided by container
  deviceKey: PropTypes.string.isRequired,
  style: PropTypes.object,
}

// Container
const mapStateToProps = (state, ownProps) => ({
  points: getPoints(state, ownProps.deviceKey),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Points)