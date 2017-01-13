import React, { PropTypes } from 'react'
import EditText from '../edit-text/edit-text'

const Text = ({ settingsKey, settings, editKeyPrefix, type }) => (
  <EditText
    editKey={`${editKeyPrefix}${settingsKey}`}
    defaultText={`${settings[settingsKey]}`}
    type={type}
  />
)

Text.propTypes = {
  settingsKey: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  editKeyPrefix: PropTypes.string.isRequired,
  type: PropTypes.string,
}

export default Text