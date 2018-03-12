import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bootstrap2Toggle as ReactBootstrapToggle } from 'react-bootstrap-toggle';

import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css';

import { save } from './';

// component
export const Dropdown = ({
  settingsKey, settings, onChange,
  editKeyPrefix,
}) => (
  <ReactBootstrapToggle
    on="true"
    off="false"
    active={settings[settingsKey]}
    onChange={value =>
      onChange(editKeyPrefix, settingsKey, value)}
  />
);

Dropdown.propTypes = {
  settingsKey: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  editKeyPrefix: PropTypes.string.isRequired,
};

// Container
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onChange: (editKeyPrefix, key, value) =>
    dispatch(save(editKeyPrefix, key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
