import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'

const DeviceName = ({ deviceKey, deviceId, deviceName, edit,
  editCallback, finishCallback }) => {
  let text = deviceName || deviceId.substr(-6)

  if (!edit) return (
    <span
      onClick={() => editCallback(deviceKey, deviceName)}
    >{text}</span>
  )

  return (
    <FormControl
      autoFocus
      type='text'
      onChange={(event) => editCallback(deviceKey, event.target.value)}
      onBlur={(event) => finishCallback(false, deviceKey, event.target.value)}
      onKeyPress={(event) => event.key === 'Enter'  &&
        finishCallback(false, deviceKey, event.target.value)}
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
}

export default DeviceName