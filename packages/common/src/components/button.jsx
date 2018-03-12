import React from 'react';
import PropTypes from 'prop-types';
import { Button as BsButton, Glyphicon } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const Button = ({
  label, glyph, faIcon, Wrapper = BsButton, ...props
}) => (
  <Wrapper {...props}>
    {glyph && <Glyphicon glyph={glyph} />}
    {faIcon && <FontAwesome name={faIcon} />}
    {(glyph || faIcon) && <span>&nbsp;</span>}
    {label}
  </Wrapper>
);

Button.propTypes = {
  bsSize: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  glyph: PropTypes.string,
  faIcon: PropTypes.string,
  Wrapper: PropTypes.func,
};

Button.defaultProps = {
  bsSize: null,
  glyph: null,
  faIcon: null,
  Wrapper: null,
};

export default Button;
