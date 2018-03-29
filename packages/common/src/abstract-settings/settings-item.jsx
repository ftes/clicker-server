import React from 'react';
import PropTypes from 'prop-types';

const SettingsItem = ({ title, child, childFirst }) => (
  <li className="list-group-item d-flex">
    {childFirst &&
      <span>
        {child}
      </span>}
    <span>
      <b>{title}:</b> &nbsp;
    </span>
    {!childFirst &&
      <span style={{ flexGrow: 1 }}>
        {child}
      </span>}
  </li>
);

SettingsItem.propTypes = {
  title: PropTypes.string.isRequired,
  child: PropTypes.node.isRequired,
  childFirst: PropTypes.bool,
};

SettingsItem.defaultProps = {
  childFirst: false,
};

export default SettingsItem;
