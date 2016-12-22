import React from 'react'
import { Navbar, Nav, NavItem, Modal } from 'react-bootstrap'
import Save from '../save/SaveC'
import Load from '../save/LoadC'
import IdMappings from '../id-mappings/IdMappingsC'
import Button from './Button'
import AskQuestion from '../questions/AskQuestionC'
import Reset from '../save/ResetC'
import { zIndex } from '../core/globals'

class MyNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showIdMappings: false }
  }

  closeIdMappings() {
    this.setState({ showIdMappings: false })
  }

  openIdMappings() {
    this.setState({ showIdMappings: true })
  }

  render() {
    let input
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
            <Reset Wrapper={NavItem}/>
            <Button
              Wrapper={NavItem}
              onClick={() => this.openIdMappings()}
              faIcon='edit'
              label='ID Mappings'
            />
            <Save Wrapper={NavItem}/>
            <Load Wrapper={NavItem} getInput={() => input}/>
          </Nav>
        </Navbar.Collapse>

        <input type='file' style={{ display: 'none' }} ref={c => input = c}/>
        <Modal
          show={this.state.showIdMappings}
          onHide={() => this.closeIdMappings()}
        >
          <Modal.Header closeButton>
            <Modal.Title>ID Mappings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IdMappings/>
          </Modal.Body>
        </Modal>
      </Navbar>
    )
  }
}

export default MyNavbar