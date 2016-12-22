import React, { PropTypes } from 'react'

const Question = ({ title, answeredBy }) => (
  <span>
    <b>{title}: </b>
    {answeredBy.join(', ')}
  </span>
)

Question.propTypes = {
  title: PropTypes.string.isRequired,
  answeredBy: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Question