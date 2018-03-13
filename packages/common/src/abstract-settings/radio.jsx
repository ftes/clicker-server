import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { save } from './';

// component
export const Dropdown = ({
  settingsKey, settings, onChange,
  editKeyPrefix,
}) => (
  <input
    className="form-check-input"
    type="checkbox"
    checked={settings[settingsKey]}
    onChange={e => onChange(editKeyPrefix, settingsKey, e.target.checked)}
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
