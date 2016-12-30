import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

import AnsweredIndicator from '../../questions/AnsweredIndicatorC'
import AnsweredCount from '../../questions/AnsweredCountC'
import { isIgnored } from './'
import Device from '../device/DeviceC'

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
        <span style={{ fontSize: '1.3em', marginRight: '20px' }}>
          <AnsweredIndicator deviceKey={device.deviceKey}/>
        </span>
        <span style={{ fontSize: '1.3em', marginRight: '20px' }}>
          <AnsweredCount deviceKey={device.deviceKey}/>
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