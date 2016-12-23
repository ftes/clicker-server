import React, { PropTypes } from 'react'
import { Label } from 'react-bootstrap'

const Question = ({ title, answeredBy }) => {
  let i = 0

  return (
    <span>
      <b>{title}: </b>
      {answeredBy.map(name =>
        <Label
          bsStyle='success'
          key={i++}
          style={{
            marginRight: '5px',
          }}
        >
          {name}
        </Label>
      )}
    </span>
  )
}

Question.propTypes = {
  title: PropTypes.string.isRequired,
  answeredBy: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Question