import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getPoints } from './'

// Component
export const Points = ({ points }) => (
  <span>{points}</span>
)

Points.propTypes = {
  points: PropTypes.number.isRequired, // provided by container
  deviceKey: PropTypes.string.isRequired,
}

// Container
const mapStateToProps = (state, ownProps) => ({
  points: getPoints(state, ownProps.deviceKey),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Points)