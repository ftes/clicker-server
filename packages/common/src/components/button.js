import React, { PropTypes } from 'react'
import { Button as BsButton, Glyphicon } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Button = ({ label, glyph, faIcon, Wrapper, ...props }) => {
  Wrapper = Wrapper || BsButton
  return (
    <Wrapper {...props}>
      {glyph && <Glyphicon glyph={glyph}/>}
      {faIcon && <FontAwesome name={faIcon}/>}
      {(glyph || faIcon) && <span>&nbsp;</span>}
      {label}
    </Wrapper>
  )
}

Button.propTypes = {
  bsSize: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  glyph: PropTypes.string,
  faIcon: PropTypes.string,
  Wrapper: PropTypes.func,
}

export default Button