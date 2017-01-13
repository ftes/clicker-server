import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { deleteQuestion } from './'
import Question from '../question/question'

// Component
export const QuestionList = ({ questions, deleteCallback }) => (
  <div>
  {questions.map(question =>
    <div key={question.id} className='question'>
      <Button
        bsSize='xsmall'
        onClick={() => deleteCallback(question.id)}
      >
        ✕
      </Button>
      {' '}
      <Question {...question}/>
    </div>
  )}
  </div>
)

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  deleteCallback: PropTypes.func.isRequired,
}

// Container
const local = state => state.questions.list

const mapStateToProps = (state) => ({
  questions: [...local(state)].reverse(),
})

const mapDispatchToProps = (dispatch) => ({
  deleteCallback: (id) => dispatch(deleteQuestion(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)