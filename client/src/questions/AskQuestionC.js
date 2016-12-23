import { connect } from 'react-redux'
import AskQuestion from './AskQuestion'
import { start } from './question'
import { getNextId } from './question-list'
import { getState as settings } from './settings'

const mapStateToProps = (state) => ({
  durationMs: settings(state).durationMs,
  nextId: getNextId(state),
})

const mapDispatchToProps = (dispatch) => ({
  startCallback: (title, durationMs, id) => {
    let startAction = start(title, id, durationMs)
    dispatch(startAction)
  }
})

const AskQuestionC = connect(mapStateToProps, mapDispatchToProps)(AskQuestion)

export default AskQuestionC