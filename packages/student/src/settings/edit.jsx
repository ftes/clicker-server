import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getState as local, set, toggleShow, reset, get } from './';
import { bind as bindWebsocket } from '../websocket';

// Component
const FieldGroup = ({
  settings, itemKey, label, help, type,
  connectWebsocket, ...props
}) => (
  <div className="form-group">
    <label htmlFor={itemKey}>
      {label || itemKey}
      <input
        id={itemKey}
        type={type}
        value={get(settings, itemKey)}
        onChange={(e) => {
          const custom = e.target.value;
          props.set(itemKey, custom);
          if (itemKey === 'server') { connectWebsocket(custom || settings.default.server); }
        }}
      />
    </label>
    <small className="form-text text-muted">{help}</small>
  </div>
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
    <small className="form-text text-muted">
      Settings are saved immediately when an item is edited.
      No need to click save anywhere.
    </small>
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
    <div className="btn-toolbar">
      <button className="btn" onClick={props.toggleShow}>Close</button>
      <button
        onClick={() => {
          props.reset();
          props.connectWebsocket(props.settings.default.server);
        }}
        className="btn float-right"
      >
        Reset
      </button>
    </div>
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
