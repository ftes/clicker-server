import React, { PropTypes } from 'react'
import QuestionList from './question-list/QuestionListC'
import Countdown from './countdown/CountdownC'
import { zIndex } from '../core/globals'

const Questions = ({ lastQuestion, countdownActive }) => (
  <div>
    <h3>Questions</h3>
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
          zIndex: zIndex.countdown,
        }}
      >
        {lastQuestion.title}
        <b style={{ fontSize: '1.5em' }}>
          <Countdown/>
        </b>
      </div>
    }
    <QuestionList/>
  </div>
)

Questions.propTypes = {
  lastQuestion: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  countdownActive: PropTypes.bool.isRequired
}

export default Questions