import React, { PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import Text from './Text'
import Dropdown from './DropdownC'
import SettingsItem from './SettingsItem'
import { functions } from '../showdown'

const Settings = ({ settings, showSettings }) => (
  showSettings &&
    <ListGroup>
      <SettingsItem
        title='Question duration (ms)'
        child={<Text settingsKey='durationMs' settings={settings}/>}
      />
      <SettingsItem
        title='Selection duration (ms)'
        child={<Text settingsKey='showdownDurationMs' settings={settings}/>}
      />
      <SettingsItem
        title='Selection animation'
        child={<Dropdown
          settingsKey='showdown'
          settings={settings}
          options={Object.keys(functions)}/>
        }
      />
      {settings.showdown === 'random' &&
        <SettingsItem
          title='Number of random hops'
          child={<Text settingsKey='randomN' settings={settings}/>}
        />
      }
    </ListGroup>
)

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  showSettings: PropTypes.bool.isRequired,
}

export default Settings