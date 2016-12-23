import React, { PropTypes } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

class AskQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  start() {
    let { nextId, startCallback, durationMs } = this.props
    startCallback(this.state.value || this.placeholder, durationMs, nextId)
    this.setState({ value: '' })
  }

  render() {
    this.placeholder = `Question ${this.props.nextId}`
    return (
      <FormGroup>
        <FormControl
          type='text'
          onKeyPress={(e) => e.key === 'Enter' && this.start()}
          onChange={e => this.setState({ value: e.target.value })}
          placeholder={this.placeholder}
          value={this.state.value}
        />
        {' '}
        <Button
          type='submit'
          onClick={() => this.start()}
        >
          Ask Question
        </Button>
      </FormGroup>
    )
  }
}


AskQuestion.propTypes = {
  startCallback: PropTypes.func.isRequired,
  nextId: PropTypes.number.isRequired,
  durationMs: PropTypes.number.isRequired,
}

export default AskQuestion