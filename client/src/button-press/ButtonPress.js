import React, { PropTypes } from 'react'

const ButtonPress = ({ pressed }) => (
  <span
    style={{
      backgroundColor: pressed ? 'red' : 'white',
    }}
  >
    pressed
  </span>
)

ButtonPress.propTypes = {
  pressed: PropTypes.bool,
}

export default ButtonPress