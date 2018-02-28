import React, { PropTypes } from 'react'

let style = {
  position: 'absolute',
  display: 'block'
}

const ButtonPress = ({ pressed }) => (
  <span
    style={{
      ...style,
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