import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { set, getState as local, fetchDefault } from './'

// COMPONENT
export class LoadSettings extends Component {
  componentWillMount() {
    if (window.device) this.props.setDeviceId(window.device.uuid)
    this.props.fetchDefault(this.props.customServer)
  }

  render() {
    return null
  }
}

LoadSettings.propTypes = {
  setDeviceId: PropTypes.func.isRequired,
  fetchDefault: PropTypes.func.isRequired,
  customServer: PropTypes.string,
}

// CONTAINER
const mapStateToProps = (state) => ({
  customServer: local(state).custom.server
})

const mapDispatchToProps = (dispatch) => ({
  setDeviceId: (deviceId) => dispatch(set('deviceId', deviceId)),
  fetchDefault: (customServer) => dispatch(fetchDefault(customServer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadSettings)