import { connect } from 'react-redux'
import AnsweredIndicator from './AnsweredIndicator'
import { getLastQuestion, getState as questionList } from './question-list'

function hasAnswered(state, deviceKey) {
  let lastQuestion = getLastQuestion(questionList(state))
  if (! lastQuestion) return false
  return lastQuestion.answeredBy.indexOf(deviceKey) !== -1
}

const mapStateToProps = (state, ownProps) => ({
  answered: hasAnswered(state, ownProps.deviceKey),
})

const mapDispatchToProps = () => ({})

const AnsweredIndicatorC =
  connect(mapStateToProps, mapDispatchToProps)(AnsweredIndicator)

export default AnsweredIndicatorC