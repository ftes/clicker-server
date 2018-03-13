import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Text, SettingsItem, Radio } from '../../abstract-settings';
import { editKeyPrefix, getState as local } from './';
import { getState as getShowSettingsState } from '../../show-settings';

// Component
export const SettingsComponent = ({ settings, showSettings }) => (
  showSettings &&
    <ul className="list-group">
      <SettingsItem
        title="Row width"
        child={<Text
          type="number"
          settingsKey="rowWidth"
          settings={settings}
          editKeyPrefix={editKeyPrefix}
        />}
      />
      <SettingsItem
        title="Font size of names"
        child={<Text
          type="number"
          settingsKey="fontSizeNames"
          settings={settings}
          editKeyPrefix={editKeyPrefix}
        />}
      />
      <SettingsItem
        title="Font size of points"
        child={<Text
          type="number"
          settingsKey="fontSizePoints"
          settings={settings}
          editKeyPrefix={editKeyPrefix}
        />}
      />
      <SettingsItem
        title="Hide Devices without custom name"
        child={<Radio
          settingsKey="hideNonCustomNames"
          settings={settings}
          editKeyPrefix={editKeyPrefix}
        />}
      />
      <SettingsItem
        title="Show Button presses"
        child={<Radio
          settingsKey="showButtonPress"
          settings={settings}
          editKeyPrefix={editKeyPrefix}
        />}
      />
    </ul>
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
