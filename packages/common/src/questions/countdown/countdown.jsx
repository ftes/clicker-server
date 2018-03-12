import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRemainingMs, clear, getState as local } from './';
import { toClient } from '../../time-offset';

// Component
export class CountdownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
    this.tick();
  }

  clearTimer() {
    clearInterval(this.timerID);
    this.props.clearCallback();
  }

  tick() {
    const msRemaining = getRemainingMs(this.props.end);
    const secondsRemaining = Math.ceil(msRemaining / 1000);
    this.setState({ secondsRemaining });
    if (msRemaining < 0) this.clearTimer();
  }

  render() {
    return (
      <span>{this.state.secondsRemaining}</span>
    );
  }
}

CountdownComponent.propTypes = {
  end: PropTypes.number.isRequired,
  clearCallback: PropTypes.func.isRequired,
};

// Container
const mapStateToProps = state => ({
  end: toClient(local(state), state),
});

const mapDispatchToProps = dispatch => ({
  clearCallback: () => dispatch(clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountdownComponent);
