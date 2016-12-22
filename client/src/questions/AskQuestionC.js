import { connect } from 'react-redux'
import AskQuestion from './AskQuestion'
import { start } from './question'
import { getNextId } from './question-list'

const local = (state) => state.questions

const mapStateToProps = (state) => ({
  durationMs: local(state).settings.durationMs,
  nextId: getNextId(local(state).list),
})

const mapDispatchToProps = (dispatch) => ({
  startCallback: (title, durationMs, id) => {
    let startAction = start(title, id, durationMs)
    dispatch(startAction)
  }
})

const AskQuestionC = connect(mapStateToProps, mapDispatchToProps)(AskQuestion)

export default AskQuestionC