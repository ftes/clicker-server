import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { start } from './';
import { getState as deviceList } from '../../devices/device-list';
import { getState as getDevicesSettingsState } from '../../devices/settings';

// Component
export const Showdown = ({
  startCallback, devices, devicesSettings,
}) => (
  <button
    className="btn nav-item nav-link"
    onClick={() => startCallback(devices, devicesSettings)}
    title="Randomly choose a person who knows the answer."
  >
    <FontAwesome name="play" />
    &nbsp;
    Pick
  </button>
);

Showdown.propTypes = {
  startCallback: PropTypes.func.isRequired,
  devices: PropTypes.array.isRequired,
  devicesSettings: PropTypes.object.isRequired,
};

// Container
const mapStateToProps = state => ({
  devices: deviceList(state),
  devicesSettings: getDevicesSettingsState(state),
});

const mapDispatchToProps = dispatch => ({
  startCallback: (devices, settings) => dispatch(start(devices, settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Showdown);
