import React, { PropTypes } from 'react'
import Question from '../question/QuestionC'
import { Button } from 'react-bootstrap'

const QuestionList = ({ questions, deleteCallback }) => (
  <div>
  {questions.map(question =>
    <div key={question.id}>
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

export default QuestionList