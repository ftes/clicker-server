import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Text, Dropdown, SettingsItem, Radio } from '../../abstract-settings';
import { functions } from '../showdown';
import { editKeyPrefix, getState as local } from './';
import { getState as getShowSettingsState } from '../../show-settings';

// Component
export const SettingsComponent = ({ settings, showSettings }) => (
  showSettings &&
    <ListGroup>
      <SettingsItem
        title="Question duration (ms)"
        child={<Text
          settingsKey="durationMs"
          settings={settings}
          editKeyPrefix={editKeyPrefix}
        />}
      />
      <SettingsItem
        title="Selection duration (ms)"
        child={<Text
          settingsKey="showdownDurationMs"
          settings={settings}
          editKeyPrefix={editKeyPrefix}
        />}
      />
      <SettingsItem
        title="Selection animation"
        child={<Dropdown
          settingsKey="showdown"
          settings={settings}
          editKeyPrefix={editKeyPrefix}
          options={Object.keys(functions)}
        />
        }
      />
      {settings.showdown === 'random' &&
        <SettingsItem
          title="Number of random hops"
          child={<Text
            settingsKey="randomN"
            settings={settings}
            editKeyPrefix={editKeyPrefix}
          />}
        />
      }
      <SettingsItem
        title="Show who answered"
        child={<Radio
          settingsKey="showWhoAnswered"
          settings={settings}
          editKeyPrefix={editKeyPrefix}
        />
        }
      />
    </ListGroup>
);

SettingsComponent.propTypes = {
  settings: PropTypes.object.isRequired,
  showSettings: PropTypes.bool.isRequired,
};

// Container
const mapStateToProps = state => ({
  settings: local(state),
  showSettings: getShowSettingsState(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
