import React, { PropTypes } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'

const Offset = ({ increase, deviceKey, ...props }) => (
  <span>
    <ButtonToolbar style={{ display: 'inline-block' }}>
      <Button onClick={() => increase(deviceKey, 1)} {...props}>+</Button>
      <Button onClick={() => increase(deviceKey, -1)} {...props}>-</Button>
    </ButtonToolbar>
  </span>
)


Offset.propTypes = {
  increase: PropTypes.func.isRequired,
  deviceKey: PropTypes.string.isRequired,
}

export default Offset