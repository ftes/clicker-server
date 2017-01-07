import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

import AnsweredIndicator from '../../questions/AnsweredIndicatorC'
import Points from '../../points/PointsC'
import { isIgnored } from './'
import Device from '../device/DeviceC'
import Offset from '../../offset/OffsetC'

import './DeviceItem.css'

const DeviceItem = ({ device, tabIndex, showSettings, deleteCallback }) => (
  <div
    style={{
      display: 'flex',
      padding: '8px',
    }}
  >
    <span
      style={{ flexGrow: 1 }} //expand
    >
      <Device
        {...device}
        // the input field must have the proper tabIndex,
        // because it will have the focus
        tabIndex={isIgnored(device.deviceType)
          ? null : tabIndex++}
      />
    </span>
    {!isIgnored(device.deviceType) &&
      <span>
        <span className='deviceInfo'>
          <AnsweredIndicator deviceKey={device.deviceKey}/>
        </span>
        <span className='deviceInfo'>
          <Offset deviceKey={device.deviceKey} bsSize='xsmall'/>
        </span>
        <span className='deviceInfo'>
          <Points deviceKey={device.deviceKey}/>
        </span>
      </span>
    }
    {showSettings &&
      <span>
        <Button
          bsSize='xsmall'
          onClick={() => deleteCallback(device.deviceKey)}
          title='Delete'
        >
          ✕
        </Button>
      </span>
    }
  </div>
)

DeviceItem.propTypes = {
  device: PropTypes.object.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  showSettings: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,
}

export default DeviceItem