import { connect } from 'react-redux'
import Questions from './Questions'
import { getLastQuestion } from './question-list'
import { isActive } from './countdown'

const local = (state) => state.questions

const mapStateToProps = (state) => ({
  countdownActive: isActive(local(state).countdown),
  lastQuestion: getLastQuestion(local(state).list),
})

const mapDispatchToProps = () => ({})

const QuestionsC = connect(mapStateToProps, mapDispatchToProps)(Questions)

export default QuestionsC