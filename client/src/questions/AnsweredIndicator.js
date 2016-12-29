import React, { PropTypes } from 'react'
import FA from 'react-fontawesome'

const AnsweredIndicator = ({ answered }) => (
  answered ? <FA name='thumbs-o-up' title='Knows the answer.'/> : null
)


AnsweredIndicator.propTypes = {
  answered: PropTypes.bool.isRequired,
  deviceKey: PropTypes.string.isRequired,
}

export default AnsweredIndicator