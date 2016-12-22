import React, { PropTypes } from 'react'

const Question = ({ title, active, answeredBy }) => (
  <span
    style={{
      color: active ? 'green' : null,
    }}
  >
    <b>{title}: </b>
    {answeredBy.join(', ')}
  </span>
)

Question.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  answeredBy: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Question