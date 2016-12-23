import { connect } from 'react-redux'
import Questions from './Questions'
import { getLastQuestion, getState as questionList } from './question-list'
import { isActive, getState as countdown } from './countdown'

const mapStateToProps = (state) => ({
  countdownActive: isActive(countdown(state)),
  lastQuestion: getLastQuestion(questionList(state)),
})

const mapDispatchToProps = () => ({})

const QuestionsC = connect(mapStateToProps, mapDispatchToProps)(Questions)

export default QuestionsC