import React, { PropTypes } from 'react'
import EditText from '../../edit-text/EditTextC'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { editKeyPrefix } from './'

const Settings = ({ durationMs, showdownDurationMs, showSettings }) => (
  showSettings &&
    <ListGroup>
      <ListGroupItem style={{ display: 'flex' }}>
        <span>
          <b>Question duration (ms):</b> &nbsp;
        </span>
        <span style={{ flexGrow: 1 }}>
        <EditText
          editKey={`${editKeyPrefix}durationMs`}
          defaultText={durationMs + ''}
        />
        </span>
      </ListGroupItem>

      <ListGroupItem style={{ display: 'flex' }}>
        <span>
          <b>Selection duration (ms):</b> &nbsp;
        </span>
        <span style={{ flexGrow: 1 }}>
        <EditText
          editKey={`${editKeyPrefix}showdownDurationMs`}
          defaultText={showdownDurationMs + ''}
        />
        </span>
      </ListGroupItem>
    </ListGroup>
)

Settings.propTypes = {
  durationMs: PropTypes.number.isRequired,
  showdownDurationMs: PropTypes.number.isRequired,
  showSettings: PropTypes.bool.isRequired,
}

export default Settings