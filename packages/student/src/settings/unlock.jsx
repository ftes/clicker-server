import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, ControlLabel, FormControl,
  Button, ButtonToolbar,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { unlock, getState as local, toggleShow } from './';

// Component
export class UnlockComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pin: '' };
  }

  unlock() {
    this.props.unlock(this.state.pin);
  }

  render() {
    const { unlockFailed } = this.props;
    return (
      <div>
        <FormGroup validationState={unlockFailed ? 'error' : null}>
          <ControlLabel>PIN (default: 0000)</ControlLabel>
          <FormControl
            type="number"
            onChange={e => this.setState({ pin: e.target.value })}
            onKeyPress={e => e.key === 'Enter' && this.unlock()}
          />
        </FormGroup>
        <ButtonToolbar>
          <Button onClick={() => this.unlock()}>Unlock</Button>
          <Button className="pull-right" onClick={this.props.toggleShow}>Close</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

UnlockComponent.propTypes = {
  unlock: PropTypes.func.isRequired,
  unlockFailed: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
};

// Container`
const mapStateToProps = state => ({
  unlockFailed: local(state).unlockFailed,
});

const mapDispatchToProps = dispatch => ({
  unlock: pin => dispatch(unlock(pin)),
  toggleShow: () => dispatch(toggleShow()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnlockComponent);
