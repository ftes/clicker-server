import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Save from '../save/SaveC'
import Load from '../save/LoadC'

const MyNavbar = () => {
  let input
  return (
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
          <Load Wrapper={NavItem} getInput={() => input}/>
        </Nav>
      </Navbar.Collapse>
      <input type='file' style={{ display: 'none' }} ref={c => input = c}/>
    </Navbar>
  )
}

export default MyNavbar