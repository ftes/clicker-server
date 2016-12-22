import { connect } from 'react-redux'
import QuestionList from './QuestionList'
import { deleteQuestion } from './'

const local = state => state.questions.list

const mapStateToProps = (state) => ({
  questions: [...local(state)].reverse(),
})

const mapDispatchToProps = (dispatch) => ({
  deleteCallback: (id) => dispatch(deleteQuestion(id))
})

const QuestionListC = connect(mapStateToProps, mapDispatchToProps)(QuestionList)

export default QuestionListC