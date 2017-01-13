import React, { PropTypes } from 'react'
import FA from 'react-fontawesome'
import { connect } from 'react-redux'

import { getLastQuestion, getState as questionList } from './question-list'

// Component
export const AnsweredIndicator = ({ answered }) => (
  answered ? <FA name='thumbs-o-up' title='Knows the answer.'/> : null
)

AnsweredIndicator.propTypes = {
  answered: PropTypes.bool.isRequired,
  deviceKey: PropTypes.string.isRequired,
}

// Container
function hasAnswered(state, deviceKey) {
  let lastQuestion = getLastQuestion(questionList(state))
  if (! lastQuestion) return false
  return lastQuestion.answeredBy.indexOf(deviceKey) !== -1
}

const mapStateToProps = (state, ownProps) => ({
  answered: hasAnswered(state, ownProps.deviceKey),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AnsweredIndicator)