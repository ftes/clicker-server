import React, { PropTypes } from 'react'
import FA from 'react-fontawesome'
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'

import './Hints.css'

const Hints = ({ showSettings }) => {
  if (! showSettings) return null
  
  return (
    <Panel
      id='hints'
      header={<h1>Hints</h1>}
      collapsible={true}
      defaultExpanded={true}
    >
      <ListGroup>
        <ListGroupItem header='Add Devices'>
          Pressing the device button will add it to the list.
        </ListGroupItem>
        <ListGroupItem header='Edit Device Names'>
          You can edit device names by clicking on them.
        </ListGroupItem>
        <ListGroupItem header='Tab Navigation'>
          You can navigate between elements with the &nbsp;
          <FA name='exchange'/> Tab key.
        </ListGroupItem>
        <ListGroupItem header='Edit Class Name'>
          You can edit the class name by clicking on it.
        </ListGroupItem>
        <ListGroupItem header='Map IDs'>
          You can map the technical device IDs to something you can understand
          using the <FA name='edit'/> ID Mappings dialog.
        </ListGroupItem>
        <ListGroupItem header='Understanding the Displayed Names'>
          Each displayed name has an icon next to it that explains where this
          name is defined. In the list below, each setting overrides the ones
          below it.<br/>
          <FA name='user-o'/>: Custom Device name<br/>
          <FA name='edit'/>: ID Mapping<br/>
          <FA name='gear'/>: Technical Device ID<br/>
        </ListGroupItem>
      </ListGroup>
    </Panel>
  )
}

Hints.propTypes = {
  showSettings: PropTypes.bool.isRequired,
}

export default Hints