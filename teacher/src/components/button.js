import React, { PropTypes } from 'react'
import { Button as BsButton, Glyphicon } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Button = ({ label, glyph, faIcon, Wrapper, style, onClick, bsSize }) => {
  Wrapper = Wrapper || BsButton
  return (
    <Wrapper style={style} onClick={onClick} bsSize={bsSize}>
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