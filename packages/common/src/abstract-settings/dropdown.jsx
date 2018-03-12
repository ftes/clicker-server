import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

import { save } from './';

// component
export const Dropdown = ({
  settingsKey, settings, options, onChange,
  editKeyPrefix,
}) => (
  <FormControl
    componentClass="select"
    value={settings[settingsKey]}
    onChange={event =>
      onChange(editKeyPrefix, settingsKey, event.target.value)}
  >
    {options.map(o =>
      <option value={o} key={o}>{o}</option>)}
  </FormControl>
);

Dropdown.propTypes = {
  settingsKey: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
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
