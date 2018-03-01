import { Component, PropTypes } from 'react'

// COMPONENT
export default class Websocket extends Component {
  componentWillMount() {
    this.props.bind()
  }

  render() {
    return null
  }
}

Websocket.propTypes = {
  bind: PropTypes.func.isRequired,
}