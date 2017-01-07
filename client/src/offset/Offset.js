import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

const Offset = ({ increase, deviceKey, ...props }) => (
  <span>
      <Button onClick={() => increase(deviceKey, 1)} {...props}>+</Button>
      {' '}
      <Button onClick={() => increase(deviceKey, -1)} {...props}>-</Button>
  </span>
)


Offset.propTypes = {
  increase: PropTypes.func.isRequired,
  deviceKey: PropTypes.string.isRequired,
}

export default Offset