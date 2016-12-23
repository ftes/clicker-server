import { connect } from 'react-redux'
import AnsweredIndicator from './AnsweredIndicator'
import { getLastQuestion } from './question-list'

const local = (state) => state.questions

function hasAnswered(state, deviceKey) {
  let lastQuestion = getLastQuestion(state.list)
  if (! lastQuestion) return false
  return lastQuestion.answeredBy.indexOf(deviceKey) !== -1
}

const mapStateToProps = (state, ownProps) => ({
  answered: hasAnswered(local(state), ownProps.deviceKey),
})

const mapDispatchToProps = () => ({})

const AnsweredIndicatorC =
  connect(mapStateToProps, mapDispatchToProps)(AnsweredIndicator)

export default AnsweredIndicatorC