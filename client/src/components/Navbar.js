import React, { PropTypes } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Save from '../save/SaveC'
import Load from '../save/LoadC'
import IdMappingsModal from '../id-mappings/IdMappingsModal'
import Button from './Button'
import AskQuestion from '../questions/AskQuestionC'
import Reset from '../save/ResetC'
import { zIndex } from '../core/globals'
import ShowSettings from '../show-settings/ShowSettingsC'

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
        <Nav pullRight>
          <ShowSettings Wrapper={NavItem}/>
        </Nav>
        {showSettings &&
          <Nav pullRight>
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