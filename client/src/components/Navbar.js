import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Save from '../save/SaveC'
import Load from '../save/LoadC'

const MyNavbar = () => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        XBee Clicker App
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <Save Wrapper={NavItem}/>
        <Load Wrapper={NavItem}/>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default MyNavbar