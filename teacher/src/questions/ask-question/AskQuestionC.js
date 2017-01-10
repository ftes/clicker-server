import { connect } from 'react-redux'
import AskQuestion from './AskQuestion'
import { start } from '../question'
import { getNextId } from '../question-list'
import { getState as local, editTitle } from './'

const mapStateToProps = (state) => ({
  title: local(state),
  nextId: getNextId(state),
})

const mapDispatchToProps = (dispatch) => ({
  startCallback: () => dispatch(start()),
  onEdit: (title) => dispatch(editTitle(title)),
})

const AskQuestionC = connect(mapStateToProps, mapDispatchToProps)(AskQuestion)

export default AskQuestionC