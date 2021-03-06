import React from 'react';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Devices } from '@clickr/common/lib/devices';
import { Questions } from '@clickr/common/lib/questions';
import { ClassName } from '@clickr/common/lib/class-name';
import { setting } from '@clickr/common/lib/components';

import { TeacherWebsocket as Websocket } from '@clickr/common/lib/websocket';
import { zIndex, tabIndex } from '../core/globals';

import './app.css';

// Component
const SDevices = setting(Devices);

const App = () => (
  <div>
    <div>
      <h3><ClassName /></h3>
      <SDevices startTabIndex={tabIndex.devices} />
      <Questions countdownZIndex={zIndex.countdown} />
    </div>
    <Websocket port={process.env.CLICKR_SERVER_PORT} />
  </div>
);

export default App;
