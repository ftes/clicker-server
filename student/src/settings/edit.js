import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl,
  Button, ButtonToolbar, HelpBlock } from 'react-bootstrap'

import { get } from './'

const FieldGroup = ({ settings, set, itemKey, label, help, type,
  connectWebsocket }) => (
  <FormGroup>
    <ControlLabel>{label || itemKey}</ControlLabel>
    <FormControl
      type={type}
      value={get(settings, itemKey)}
      onChange={(e) => {
        let custom = e.target.value
        set(itemKey, custom)
        if (itemKey === 'server')
          connectWebsocket(custom || settings.default['server'])
      }}
    />
    <HelpBlock>{help}</HelpBlock>
  </FormGroup>
)

FieldGroup.propTypes = {
  settings: PropTypes.object.isRequired,
  set: PropTypes.func.isRequired,
  itemKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
  type: PropTypes.string,
  connectWebsocket: PropTypes.func.isRequired,
}

const component = (props) => (
  <div>
    <HelpBlock>
      Settings are saved immediately when an item is edited.
      No need to click save anywhere.
    </HelpBlock>
    <FieldGroup itemKey='server' label='Server'
      help='Server URL (e.g. http://server:4001)' {...props}/>
    <FieldGroup itemKey='nButtons' label='Number of Buttons' type='number'
      help='How many buttons to show' {...props}/>
    <FieldGroup itemKey='deviceId' label='Device ID'
      help='Unique ID for this device' {...props}/>
    <FieldGroup itemKey='pin' label='PIN' type='number'
      help='PIN that protects this settings page' {...props}/>
    <ButtonToolbar>
      <Button onClick={props.toggleShow}>Close</Button>
      <Button
        onClick={() => {
          props.reset()
          props.connectWebsocket(props.settings.default.server)
        }}
        className='pull-right'
      >
        Reset
      </Button>
    </ButtonToolbar>
  </div>
)

component.propTypes = {
  settings: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  toggleShow: PropTypes.func.isRequired,
  connectWebsocket: PropTypes.func.isRequired,
}

export default component