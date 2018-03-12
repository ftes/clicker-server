import React from 'react';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  display: 'block',
};

const ButtonPress = ({ pressed }) => (
  <span
    style={{
      ...style,
      backgroundColor: pressed ? 'red' : 'white',
    }}
  >
    pressed
  </span>
);

ButtonPress.propTypes = {
  pressed: PropTypes.bool,
};

ButtonPress.defaultProps = {
  pressed: false,
};

export default ButtonPress;
