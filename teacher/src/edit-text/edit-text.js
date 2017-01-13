import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import FA from 'react-fontawesome'

import { edit, save, close, getState as local } from './'

// Component
class EditText extends React.Component {
  save(event) {
    const { editKey, onSave, onClose } = this.props
    const value = event.target.value
    onSave(editKey, value)
    onClose(editKey)
  }

  edit(event) {
    const { editKey, saveImmediately, onEdit, onSave } = this.props
    const value = event.target.value
    onEdit(editKey, value)
    if (saveImmediately) onSave(editKey, value)
  }

  render() {
    const { text, edit, tabIndex, icon, type, style,
      onEdit, editKey } = this.props
  
    if (!edit) return (
      <div
        tabIndex={tabIndex || -1}
        onFocus={() => onEdit(editKey)}
        style={{
          ...style,
          cursor: 'text',
        }}
      >
        {text}
        &nbsp;
        { icon &&
          <sup>
            <FA name={icon} style={{ fontSize: '0.8em' }}/>
          </sup>
        }
      </div>
    )

    return (
      <FormControl
        autoFocus
        tabIndex={tabIndex}
        type={type || 'text'}
        onChange={e => this.edit(e)}
        onBlur={e => this.save(e)}
        onFocus={e => e.nativeEvent.target.select()}
        onKeyPress={e => e.key === 'Enter' && this.save(e)}
        value={text}
      />
    )
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
}

// Container
function isEditing(state, ownProps) {
  return local(state).editKey === ownProps.editKey
}

function text(state, ownProps) {
  if (isEditing(state, ownProps)) {
    let text = local(state).text
    if (text !== undefined) return text
  }
  return ownProps.defaultText
}

const mapStateToProps = (state, ownProps) => ({
  edit: isEditing(state, ownProps),
  text: text(state, ownProps),
})

const mapDispatchToProps = (dispatch) => ({
  onEdit: (editKey, text) => dispatch(edit(editKey, text)),
  onSave: (editKey, text, cancelled) => dispatch(save(editKey, text, cancelled)),
  onClose: (editKey) => dispatch(close(editKey)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditText)