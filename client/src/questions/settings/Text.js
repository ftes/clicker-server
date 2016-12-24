import React, { PropTypes } from 'react'
import EditText from '../../edit-text/EditTextC'
import { editKeyPrefix } from './'

const Text = ({ settingsKey, settings }) => (
  <EditText
    editKey={`${editKeyPrefix}${settingsKey}`}
    defaultText={`${settings[settingsKey]}`}
  />
)

Text.propTypes = {
  settingsKey: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
}

export default Text