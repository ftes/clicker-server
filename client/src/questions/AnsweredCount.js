import React, { PropTypes } from 'react'

const AnsweredCount = ({ count }) => (
  <span>{count}</span>
)


AnsweredCount.propTypes = {
  count: PropTypes.number.isRequired, // provided by container
  deviceKey: PropTypes.string.isRequired,
}

export default AnsweredCount