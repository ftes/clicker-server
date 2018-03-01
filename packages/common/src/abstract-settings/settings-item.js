import React, { PropTypes } from 'react'
import { ListGroupItem } from 'react-bootstrap'

const SettingsItem = ({ title, child }) => (
  <ListGroupItem style={{ display: 'flex' }}>
    <span>
      <b>{title}:</b> &nbsp;
    </span>
    <span style={{ flexGrow: 1 }}>
      {child}
    </span>
  </ListGroupItem>
)

SettingsItem.propTypes = {
  title: PropTypes.string.isRequired,
  child: PropTypes.node.isRequired,
}

export default SettingsItem