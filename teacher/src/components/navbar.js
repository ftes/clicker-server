import React, { PropTypes } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import Save from '../save/save'
import Load from '../save/load'
import IdMappingsModal from '../id-mappings/id-mappings-modal'
import Button from './button'
import AskQuestion from '../questions/ask-question/ask-question'
import Reset from '../save/reset'
import { zIndex } from '../core/globals'
import ShowSettings from '../show-settings/show-settings'
import Showdown from '../questions/showdown/showdown'
import SaveQuestions from '../save/save-questions'

const MyNavbar = ({ showSettings }) => {
  let input
  let idMappings

  return (
    // in front of countdown
    <Navbar collapseOnSelect style={{ zIndex: zIndex.navbar }}>
      <Navbar.Header>
        <Navbar.Brand>XBee Clicker App</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <AskQuestion/>
        </Navbar.Form>
        <Nav pullLeft>
          <Showdown Wrapper={NavItem}/>
        </Nav>
        <Nav pullRight>
          <ShowSettings Wrapper={NavItem}/>
        </Nav>
        {showSettings &&
          <Nav pullRight>
            <SaveQuestions Wrapper={NavItem}/>
            <Reset Wrapper={NavItem}/>
            <Button
              Wrapper={NavItem}
              onClick={() => idMappings.open()}
              faIcon='edit'
              label='ID Mappings'
            />
            <Save Wrapper={NavItem}/>
            <Load Wrapper={NavItem} getInput={() => input}/>
          </Nav>
        }
      </Navbar.Collapse>

      <input type='file' style={{ display: 'none' }} ref={c => input = c}/>
      <IdMappingsModal ref={c => idMappings = c}/>
    </Navbar>
  )
}

MyNavbar.propTypes = {
  showSettings: PropTypes.bool.isRequired,
}

export default MyNavbar