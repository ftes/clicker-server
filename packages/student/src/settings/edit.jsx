import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, ControlLabel, FormControl,
  Button, ButtonToolbar, HelpBlock,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import { getState as local, set, toggleShow, reset, get } from './';
import { bind as bindWebsocket } from '../websocket';

// Component
const FieldGroup = ({
  settings, itemKey, label, help, type,
  connectWebsocket, ...props
}) => (
  <FormGroup>
    <ControlLabel>{label || itemKey}</ControlLabel>
    <FormControl
      type={type}
      value={get(settings, itemKey)}
      onChange={(e) => {
        const custom = e.target.value;
        props.set(itemKey, custom);
        if (itemKey === 'server') { connectWebsocket(custom || settings.default.server); }
      }}
    />
    <HelpBlock>{help}</HelpBlock>
  </FormGroup>
);

FieldGroup.propTypes = {
  settings: PropTypes.object.isRequired,
  set: PropTypes.func.isRequired,
  itemKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
  type: PropTypes.string,
  connectWebsocket: PropTypes.func.isRequired,
};

FieldGroup.defaultProps = {
  label: '',
  help: '',
  type: '',
};

export const EditComponent = props => (
  <div>
    <HelpBlock>
      Settings are saved immediately when an item is edited.
      No need to click save anywhere.
    </HelpBlock>
    <FieldGroup
      itemKey="server"
      label="Server"
      help="Server URL (e.g. http://server:4001)"
      {...props}
    />
    <FieldGroup
      itemKey="nButtons"
      label="Number of Buttons"
      type="number"
      help="How many buttons to show"
      {...props}
    />
    <FieldGroup
      itemKey="deviceId"
      label="Device ID"
      help="Unique ID for this device"
      {...props}
    />
    <FieldGroup
      itemKey="pin"
      label="PIN"
      type="number"
      help="PIN that protects this settings page"
      {...props}
    />
    <ButtonToolbar>
      <Button onClick={props.toggleShow}>Close</Button>
      <Button
        onClick={() => {
          props.reset();
          props.connectWebsocket(props.settings.default.server);
        }}
        className="pull-right"
      >
        Reset
      </Button>
    </ButtonToolbar>
  </div>
);

EditComponent.propTypes = {
  settings: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  toggleShow: PropTypes.func.isRequired,
  connectWebsocket: PropTypes.func.isRequired,
};

// Container
const mapStateToProps = state => ({
  settings: local(state),
});

const mapDispatchToProps = dispatch => ({
  set: (key, value) => dispatch(set(key, value)),
  reset: () => dispatch(reset()),
  toggleShow: () => dispatch(toggleShow()),
  connectWebsocket: uri => bindWebsocket(dispatch, uri),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);
