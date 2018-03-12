import React from 'react';
import PropTypes from 'prop-types';
import EditText from '../edit-text/edit-text';

const Text = ({
  settingsKey, settings, editKeyPrefix, type,
}) => (
  <EditText
    editKey={`${editKeyPrefix}${settingsKey}`}
    defaultText={`${settings[settingsKey]}`}
    type={type}
    saveImmediately
  />
);

Text.propTypes = {
  settingsKey: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  editKeyPrefix: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Text.defaultProps = {
  type: '',
};

export default Text;
