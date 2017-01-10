import React, { PropTypes } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const component = ({ toggleShowSettings, style }) => (
 <Navbar
  collapseOnSelect
  style={{
    ...style,
    background: 'transparent',
    border: 0,
  }}
>
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem onClick={toggleShowSettings}>Settings</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

component.propTypes = {
  toggleShowSettings: PropTypes.func.isRequired,
  style: PropTypes.object,
}

export default component