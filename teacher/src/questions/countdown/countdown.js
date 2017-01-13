import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getRemainingMs, clear, getState as local } from './'

// Component
export class Countdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
    this.tick()
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer() {
    clearInterval(this.timerID)
    this.props.clearCallback()
  }

  tick() {
    let msRemaining = getRemainingMs(this.props.end)
    let secondsRemaining = Math.ceil(msRemaining / 1000)
    this.setState({ secondsRemaining })
    if (msRemaining < 0) this.clearTimer()
  }

  render() {
    return (
      <span>{this.state.secondsRemaining}</span>
    )
  }
}

Countdown.propTypes = {
  end: PropTypes.number.isRequired,
  clearCallback: PropTypes.func.isRequired,
}

// Container
const mapStateToProps = (state) => ({
  end: local(state)
})

const mapDispatchToProps = (dispatch) => ({
  clearCallback: () => dispatch(clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(Countdown)