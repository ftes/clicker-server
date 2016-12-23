import React, { PropTypes } from 'react'
import Button from '../../components/Button'

const Showdown = (props) => (
  <Button
    {...props}
    onClick={() => props.startCallback(props.devices)}
  />
)

Showdown.propTypes = {
  startCallback: PropTypes.func.isRequired,
  devices: PropTypes.array.isRequired,
}

export default Showdown