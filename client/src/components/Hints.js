import React from 'react'
import FA from 'react-fontawesome'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

import './Hints.css'

const Hints = () => (
  <div className='hints'>
    <h3>Hints</h3>
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
    </ListGroup>
  </div>
)

export default Hints