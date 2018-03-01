import React, { PropTypes } from 'react'
import { Label } from 'react-bootstrap'
import { connect } from 'react-redux'

import { getName } from '../../device-name/device-name'
import { onlyShown } from './'
import { getState as settings } from '../settings'

// Component
export const Question = ({ title, answeredBy, settings }) => {
  let i = 0

  return (
    <span>
      <b>{title} ({answeredBy.length}) </b>
      {settings.showWhoAnswered &&
        answeredBy.map(name =>
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
  answeredBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  settings: PropTypes.object.isRequired,
}

// Container
const mapStateToProps = (state, ownProps) => ({
  answeredBy: onlyShown(ownProps.answeredBy, state)
    .map(deviceKey => getName(state, deviceKey)),
  settings: settings(state),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Question)