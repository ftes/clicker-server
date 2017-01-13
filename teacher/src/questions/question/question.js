import React, { PropTypes } from 'react'
import { Label } from 'react-bootstrap'
import { connect } from 'react-redux'

import { getName } from '../../device-name/device-name'

// Component
export const Question = ({ title, answeredBy }) => {
  let i = 0

  return (
    <span>
      <b>{title} </b>
      {answeredBy.map(name =>
        <Label
          bsStyle='success'
          key={i++}
          style={{
            marginRight: '5px',
            display: 'inline-block',
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

// Container
const mapStateToProps = (state, ownProps) => ({
  answeredBy: ownProps.answeredBy.map(deviceKey => getName(state, deviceKey)),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Question)