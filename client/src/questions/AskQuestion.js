import React, { PropTypes } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

const AskQuestion = ({ nextId, startCallback, durationMs }) => {
  let title

  return (
    <FormGroup>
      <FormControl
        type='text'
        onChange={e => title = e.target.value}
        placeholder={`Question ${nextId}`}
      />
      {' '}
      <Button
        type='submit'
        onClick={() =>
          startCallback(title || `Question ${nextId}`, durationMs, nextId)}
      >
        Ask Question
      </Button>
    </FormGroup>
  )
}


AskQuestion.propTypes = {
  startCallback: PropTypes.func.isRequired,
  nextId: PropTypes.number.isRequired,
  durationMs: PropTypes.number.isRequired,
}

export default AskQuestion