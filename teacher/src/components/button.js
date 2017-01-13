import React, { PropTypes } from 'react'
import { Button as BsButton, Glyphicon } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Button = ({ onClick, label, glyph, faIcon, Wrapper }) => {
  Wrapper = Wrapper || BsButton
  return (
    <Wrapper onClick={onClick}>
      {glyph && <Glyphicon glyph={glyph}/>}
      {faIcon && <FontAwesome name={faIcon}/>}
      &nbsp; {label}
    </Wrapper>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  glyph: PropTypes.string,
  faIcon: PropTypes.string,
  Wrapper: PropTypes.func,
}

export default Button