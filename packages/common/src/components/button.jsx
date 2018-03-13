import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

const Button = ({
  label, faIcon, className, ...props
}) => (
  <button
    type="button"
    className={classNames('btn', 'btn-primary', className)}
    {...props}
  >
    {faIcon && <FontAwesome name={faIcon} />}
    {faIcon && <span>&nbsp;</span>}
    {label}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.object,
  faIcon: PropTypes.string,
};

Button.defaultProps = {
  faIcon: null,
  className: {},
};

export default Button;
