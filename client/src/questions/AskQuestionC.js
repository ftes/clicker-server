import { connect } from 'react-redux'
import AskQuestion from './AskQuestion'
import { start, finish } from './question'
import { getNextId } from './question-list'

const local = (state) => state.questions

const mapStateToProps = (state) => ({
  durationMs: local(state).settings.durationMs,
  nextId: getNextId(local(state).list),
})

const mapDispatchToProps = (dispatch) => ({
  startCallback: (title, durationMs, id) => {
    let startAction = start(title, id)
    dispatch(startAction)
    setTimeout(() => dispatch(finish(startAction.id)), durationMs)
  }
})

const AskQuestionC = connect(mapStateToProps, mapDispatchToProps)(AskQuestion)

export default AskQuestionC