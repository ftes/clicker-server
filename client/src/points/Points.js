import React, { PropTypes } from 'react'

const Points = ({ points }) => (
  <span>{points}</span>
)


Points.propTypes = {
  points: PropTypes.number.isRequired, // provided by container
  deviceKey: PropTypes.string.isRequired,
}

export default Points