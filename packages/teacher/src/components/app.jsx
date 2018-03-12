import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { connect } from 'react-redux';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Devices } from '@clickr/common/lib/devices';
import { Questions, startQuestion } from '@clickr/common/lib/questions';
import { LocalStorage } from '@clickr/common/lib/save';
import { ClassName } from '@clickr/common/lib/class-name';
import { setting } from '@clickr/common/lib/components';
import { TeacherWebsocket as Websocket } from '@clickr/common/lib/websocket';

import Navbar from './navbar';
import Hints from './hints';
import { deleteOnLocalStorageSave } from '../core/reducers';
import { zIndex, tabIndex } from '../core/globals';

import './app.css';

// Component
const SNavbar = setting(Navbar);
const SDevices = setting(Devices);
const SHints = setting(Hints);

const keyMap = {
  askQuestion: 'ctrl+enter',
};

export const AppComponent = ({ askQuestion }) => (
  <HotKeys keyMap={keyMap} handlers={{ askQuestion }}>
    <SNavbar />
    <div className="content">
      <h3><ClassName /></h3>
      <SDevices startTabIndex={tabIndex.devices} />
      <Questions countdownZIndex={zIndex.countdown} />
      <SHints />
    </div>
    <LocalStorage deleteOnSave={deleteOnLocalStorageSave} />
    <Websocket />
  </HotKeys>
);

AppComponent.propTypes = {
  askQuestion: PropTypes.func.isRequired,
};

// CONTAINER
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  askQuestion: () => dispatch(startQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
