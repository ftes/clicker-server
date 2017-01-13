import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bind } from './'
import { getState as settings, get as getSetting } from '../settings'

// COMPONENT
export class Websocket extends Component {
  componentWillMount() {
    this.props.bind(this.props.server)
  }

  render() {
    return null
  }
}

Websocket.propTypes = {
  server: PropTypes.string.isRequired,
  bind: PropTypes.func.isRequired,
}

// CONTAINER
const mapStateToProps = (state) => ({
  server: getSetting(settings(state), 'server'),
})

const mapDispatchToProps = (dispatch) => ({
  bind: (server) => bind(dispatch, server),
})

export default connect(mapStateToProps, mapDispatchToProps)(Websocket)