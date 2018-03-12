import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { groupQuestionsByLesson } from '../../lessons';

import { deleteQuestion } from './';
import Question from '../question/question';
import Lesson from '../../lessons/lesson/lesson';

// Component
export const QuestionListComponent = ({ questionsByLesson, deleteCallback }) => (
  <div>
    {questionsByLesson.reverse().map(({ lesson, questions }) => (
      <div key={lesson.id} style={{ marginBottom: '20px' }}>
        <h4 style={{ marginTop: 0 }}><Lesson lesson={lesson} /></h4>
        {questions.reverse().map(question => (
          <div key={question.id} className="question">
            <Button
              bsSize="xsmall"
              onClick={() => deleteCallback(question.id)}
            >
              ✕
            </Button>
            {' '}
            <Question {...question} />
          </div>
        ))}
      </div>
      ))}
  </div>
);

QuestionListComponent.propTypes = {
  questionsByLesson: PropTypes.array.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};

// Container
const mapStateToProps = state => ({
  questionsByLesson: groupQuestionsByLesson(state),
});

const mapDispatchToProps = dispatch => ({
  deleteCallback: id => dispatch(deleteQuestion(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionListComponent);
