import React, { PropTypes } from 'react'
import FA from 'react-fontawesome'

const AskQuestion = ({ answered }) => (
  answered ? <FA name='thumbs-o-up' title='Knows the answer.'/> : null
)


AskQuestion.propTypes = {
  answered: PropTypes.bool.isRequired,
  deviceKey: PropTypes.string.isRequired,
}

export default AskQuestion