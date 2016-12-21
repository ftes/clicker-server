import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'

const DeviceName = ({ deviceKey, deviceId, deviceName, edit,
  editCallback, finishCallback, tabIndex }) => {
  let text = deviceName || deviceId.substr(-6)

  if (!edit) return (
    <span
      tabIndex={tabIndex}
      onFocus={() => editCallback(deviceKey)}
    >
      {text}
    </span>
  )

  return (
    <FormControl
      autoFocus
      tabIndex={tabIndex}
      type='text'
      onChange={(event) => editCallback(deviceKey, event.target.value)}
      onBlur={() => finishCallback()}
      onKeyPress={(event) => event.key === 'Enter' && finishCallback()}
      value={deviceName !== undefined ? deviceName : deviceId}
    />
  )
}

DeviceName.propTypes = {
  deviceKey: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  deviceName: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  editCallback: PropTypes.func.isRequired,
  finishCallback: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
}

export default DeviceName