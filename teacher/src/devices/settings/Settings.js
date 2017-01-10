import React, { PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Text, SettingsItem } from '../../abstract-settings'
import { editKeyPrefix } from './'

const Settings = ({ settings, showSettings }) => (
  showSettings &&
    <ListGroup>
      <SettingsItem
        title='Row width'
        child={<Text type='number' settingsKey='rowWidth'
          settings={settings} editKeyPrefix={editKeyPrefix}/>}
      />
    </ListGroup>
)

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  showSettings: PropTypes.bool.isRequired,
}

export default Settings