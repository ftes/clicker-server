import React, { PropTypes } from 'react'
import { Button as BsButton, Glyphicon } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const Button = ({ callback, label, glyph, faIcon, Wrapper }) => {
  Wrapper = Wrapper || BsButton
  return (
    <Wrapper onClick={callback}>
      {glyph && <Glyphicon glyph={glyph}/>}
      {faIcon && <FontAwesome name={faIcon}/>}
      &nbsp; {label}
    </Wrapper>
  )
}

Button.propTypes = {
  callback: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  glyph: PropTypes.string,
  faIcon: PropTypes.string,
  Wrapper: PropTypes.object,
}

export default Button