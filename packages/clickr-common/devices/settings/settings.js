import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

import { Text, SettingsItem, Radio } from '../../abstract-settings'
import { editKeyPrefix, getState as local } from './'
import { getState as showSettings } from '../../show-settings'

// Component
export const Settings = ({ settings, showSettings }) => (
  showSettings &&
    <ListGroup>
      <SettingsItem
        title='Row width'
        child={<Text type='number' settingsKey='rowWidth'
          settings={settings} editKeyPrefix={editKeyPrefix}/>}
      />
      <SettingsItem
        title='Font size of names'
        child={<Text type='number' settingsKey='fontSizeNames'
          settings={settings} editKeyPrefix={editKeyPrefix}/>}
      />
      <SettingsItem
        title='Font size of points'
        child={<Text type='number' settingsKey='fontSizePoints'
          settings={settings} editKeyPrefix={editKeyPrefix}/>}
      />
      <SettingsItem
        title='Hide Devices without custom name'
        child={<Radio settingsKey='hideNonCustomNames'
          settings={settings} editKeyPrefix={editKeyPrefix}/>}
      />
      <SettingsItem
        title='Show Button presses'
        child={<Radio settingsKey='showButtonPress'
          settings={settings} editKeyPrefix={editKeyPrefix}/>}
      />
    </ListGroup>
)

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  showSettings: PropTypes.bool.isRequired,
}

// Container
const mapStateToProps = (state) => ({
  settings: local(state),
  showSettings: showSettings(state),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)