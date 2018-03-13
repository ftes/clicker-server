import React from 'react';
import PropTypes from 'prop-types';

const SettingsItem = ({ title, child }) => (
  <li className="list-group-item d-flex">
    <span>
      <b>{title}:</b> &nbsp;
    </span>
    <span style={{ flexGrow: 1 }}>
      {child}
    </span>
  </li>
);

SettingsItem.propTypes = {
  title: PropTypes.string.isRequired,
  child: PropTypes.node.isRequired,
};

export default SettingsItem;
