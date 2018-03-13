import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionList from './question-list/question-list';
import Countdown from './countdown/countdown';
import Settings from './settings/settings';
import { getLastQuestion, getState as questionList } from './question-list';
import { isActive, getState as countdown } from './countdown';
import { toClient } from '../time-offset';

import './questions.css';

// Component
export const Questions = ({
  lastQuestion, countdownActive,
  countdownZIndex,
}) => (
  <div
    className="card"
    id="questions"
  >
    <div className="card-header">
      <h1>Questions</h1>
    </div>
    <div className="card-body">
      <Settings />
      {countdownActive &&
        <div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            fontSize: '6em',
            zIndex: countdownZIndex,
          }}
        >
          {lastQuestion.title}
          <b style={{ fontSize: '1.5em' }}>
            <Countdown />
          </b>
        </div>
      }
      <QuestionList />
    </div>
  </div>
);

Questions.propTypes = {
  lastQuestion: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  countdownActive: PropTypes.bool.isRequired,
  countdownZIndex: PropTypes.number.isRequired,
};

Questions.defaultProps = {
  lastQuestion: null,
};

// Container
const mapStateToProps = state => ({
  countdownActive: isActive(toClient(countdown(state), state)),
  lastQuestion: getLastQuestion(questionList(state)),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
