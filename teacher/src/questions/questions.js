import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux'

import QuestionList from './question-list/question-list'
import Countdown from './countdown/countdown'
import { zIndex } from '../core/globals'
import Settings from './settings/settings'
import { getLastQuestion, getState as questionList } from './question-list'
import { isActive, getState as countdown } from './countdown'

import './questions.css'

// Component
export const Questions = ({ lastQuestion, countdownActive }) => (
  <Panel
    header={<h1>Questions</h1>}
    collapsible={true}
    defaultExpanded={true}
    id='questions'
  >
    <Settings/>
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
  </Panel>
)

Questions.propTypes = {
  lastQuestion: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  countdownActive: PropTypes.bool.isRequired
}

// Container
const mapStateToProps = (state) => ({
  countdownActive: isActive(countdown(state)),
  lastQuestion: getLastQuestion(questionList(state)),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)