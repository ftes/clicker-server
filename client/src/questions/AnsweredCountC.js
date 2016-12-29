import { connect } from 'react-redux'
import AnsweredCount from './AnsweredCount'
import { getState as questionList } from './question-list'

function getCount(state, deviceKey) {
  let questions = questionList(state)
  let answered = questions.map(q =>
    q.answeredBy.indexOf(deviceKey) !== -1 ? 1 : 0)
  let count = answered.reduce((sum, cur) => sum + cur, 0)
  return count
}

const mapStateToProps = (state, ownProps) => ({
  count: getCount(state, ownProps.deviceKey),
})

const mapDispatchToProps = () => ({})

const AnsweredCountC =
  connect(mapStateToProps, mapDispatchToProps)(AnsweredCount)

export default AnsweredCountC