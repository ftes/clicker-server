import React from 'react';
import PropTypes from 'prop-types';
import { RequestBatteryLevel } from '../battery-level';
import DeviceList from './device-list/device-list';
import AddEmpty from './device/add-empty';
import { Settings } from './settings';

const Devices = ({ showSettings, ...props }) => (
  <div className="devices">
    <Settings />
    <DeviceList {...props} />
    {showSettings &&
      <div
        className="btn-toolbar"
        style={{
          marginBottom: '20px',
        }}
      >
        <RequestBatteryLevel />
        <AddEmpty />
      </div>
    }
  </div>
);

Devices.propTypes = {
  showSettings: PropTypes.bool.isRequired,
};

export default Devices;
