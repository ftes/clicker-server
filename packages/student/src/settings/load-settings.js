import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { set, getState as local, fetchDefault } from './';

// COMPONENT
export class LoadSettingsComponent extends Component {
  componentWillMount() {
    if (window.device) this.props.setDeviceId(window.device.uuid);
    this.props.fetchDefault(this.props.customServer);
  }

  render() {
    return null;
  }
}

LoadSettingsComponent.propTypes = {
  setDeviceId: PropTypes.func.isRequired,
  fetchDefault: PropTypes.func.isRequired,
  customServer: PropTypes.string,
};

LoadSettingsComponent.defaultProps = {
  customServer: null,
};

// CONTAINER
const mapStateToProps = state => ({
  customServer: local(state).custom.server,
});

const mapDispatchToProps = dispatch => ({
  setDeviceId: deviceId => dispatch(set('deviceId', deviceId)),
  fetchDefault: customServer => dispatch(fetchDefault(customServer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadSettingsComponent);
