import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import { increase } from './'

// Component
export const Offset = ({ increase, deviceKey, ...props }) => (
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

// Container
const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch) => ({
  increase: (deviceKey, value) => dispatch(increase(deviceKey, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Offset)