import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl,
  Button, ButtonToolbar } from 'react-bootstrap'

class Unlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pin: '' }
  }

  unlock() {
    this.props.unlock(this.state.pin)
  }

  render() {
    const { unlockFailed, toggleShow } = this.props
    return (
      <div>
        <FormGroup validationState={unlockFailed ? 'error' : null}>
          <ControlLabel>PIN (default: 0000)</ControlLabel>
          <FormControl
            type='number'
            onChange={(e) => this.setState({ pin: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && this.unlock()}
          />
        </FormGroup>
        <ButtonToolbar>
          <Button onClick={() => this.unlock()}>Unlock</Button>
          <Button className='pull-right' onClick={toggleShow}>Close</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

Unlock.propTypes = {
  unlock: PropTypes.func.isRequired,
  unlockFailed: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
}

export default Unlock