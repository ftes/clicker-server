import React, { PropTypes } from 'react'
import Button from '../../components/Button'

const Showdown = (props) => (
  <Button
    {...props}
    onClick={() => props.startCallback(props.devices)}
    title='Randomly choose a person who knows the answer.'
  />
)

Showdown.propTypes = {
  startCallback: PropTypes.func.isRequired,
  devices: PropTypes.array.isRequired,
}

export default Showdown