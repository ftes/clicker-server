import React, { PropTypes } from 'react'
import { Button as BsButton, Glyphicon } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Button = ({ callback, label, glyph, faIcon }) => (
  <BsButton onClick={callback}>
    {glyph && <Glyphicon glyph={glyph}/>}
    {faIcon && <FontAwesome name={faIcon}/>}
    &nbsp; {label}
  </BsButton>
)

Button.propTypes = {
  callback: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  glyph: PropTypes.string,
  faIcon: PropTypes.string,
}

export default Button