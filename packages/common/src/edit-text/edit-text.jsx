import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import FA from 'react-fontawesome';

import { edit, save, close, getState as local } from './';

// Component
class EditText extends React.Component {
  save(event) {
    const { editKey, onSave, onClose } = this.props;
    const { target: { value } } = event;
    onSave(editKey, value);
    onClose(editKey);
  }

  edit(event) {
    const {
      editKey, saveImmediately, onEdit, onSave,
    } = this.props;
    const { target: { value } } = event;
    onEdit(editKey, value);
    if (saveImmediately) onSave(editKey, value);
  }

  render() {
    const {
      tabIndex, icon, type, style,
      onEdit, editKey,
    } = this.props;

    if (!this.props.edit) {
      return (
        <div
          tabIndex={tabIndex || -1}
          onFocus={() => onEdit(editKey)}
          style={{
          ...style,
          cursor: 'text',
        }}
        >
          {this.props.text}
        &nbsp;
          { icon &&
          <sup>
            <FA name={icon} style={{ fontSize: '0.8em' }} />
          </sup>
        }
        </div>
      );
    }

    return (
      <FormControl
        autoFocus
        tabIndex={tabIndex}
        type={type || 'text'}
        onChange={e => this.edit(e)}
        onBlur={e => this.save(e)}
        onFocus={e => e.nativeEvent.target.select()}
        onKeyPress={e => e.key === 'Enter' && this.save(e)}
        value={this.props.text}
      />
    );
  }
}

EditText.propTypes = {
  editKey: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
  icon: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  saveImmediately: PropTypes.bool,
};

EditText.defaultProps = {
  tabIndex: 0,
  type: null,
  icon: null,
  style: {},
  saveImmediately: false,
};

// Container
function isEditing(state, ownProps) {
  return local(state).editKey === ownProps.editKey;
}

function text(state, ownProps) {
  if (isEditing(state, ownProps)) {
    const textInState = local(state).text;
    if (textInState !== undefined) return textInState;
  }
  return ownProps.defaultText;
}

const mapStateToProps = (state, ownProps) => ({
  edit: isEditing(state, ownProps),
  text: text(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  onEdit: (editKey, txt) => dispatch(edit(editKey, txt)),
  onSave: (editKey, txt, cancelled) => dispatch(save(editKey, txt, cancelled)),
  onClose: editKey => dispatch(close(editKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditText);
