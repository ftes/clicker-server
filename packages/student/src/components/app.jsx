import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import { LocalStorage } from '@clickr/common/lib/save';

import Settings from '../settings/settings';
import Buttons from '../buttons/buttons';
import { BatteryLevel } from '../battery-level';
import Websocket from '../websocket/websocket';
import LoadSettings from '../settings/load-settings';
import FiveClick from '../settings/five-click';
import Insomnia from './insomnia';
import { getState as settings } from '../settings';
import { deleteOnSave } from '../core/reducers';

// Component
export const AppComponent = ({ showSettings }) => (
  <FiveClick>
    <div
      className="content"
      style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}
    >
      {showSettings &&
        <Settings />
      }
      {!showSettings &&
        <Buttons />
      }
    </div>
    <LoadSettings />
    <BatteryLevel />
    <LocalStorage deleteOnSave={deleteOnSave} />
    <Websocket />
    <Insomnia />
  </FiveClick>
);

AppComponent.propTypes = {
  showSettings: PropTypes.bool.isRequired,
};

// Container
const mapStateToProps = state => ({
  showSettings: settings(state).show,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
