import React, { PropTypes } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

class AskQuestion extends React.Component {
  render() {
    return (
      <FormGroup>
        <FormControl
          type='text'
          onKeyPress={(e) => e.key === 'Enter' && this.props.startCallback()}
          onChange={e => this.props.onEdit(e.target.value)}
          placeholder={`Question ${this.props.nextId}`}
          value={this.props.title}
          style={{
            width: '110px'
          }}
        />
        {' '}
        <Button
          type='submit'
          onClick={() => this.props.startCallback()}
        >
          Ask
        </Button>
      </FormGroup>
    )
  }
}


AskQuestion.propTypes = {
  startCallback: PropTypes.func.isRequired,
  nextId: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default AskQuestion