import React, { PropTypes } from 'react'
import { Button as BsButton, Glyphicon } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

// fix react warning about unsed var
// don't know how to delete prop in connect()
//eslint-disable-next-line no-unused-vars, react/prop-types
const Button = ({ label, glyph, faIcon, Wrapper, deviceKey, ...props }) => {
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
  style: PropTypes.object,
}

export default Button