import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'
import FA from 'react-fontawesome'

import { edit, save, getState as local } from './'

// Component
export const EditText = ({ editKey, text, edit, onEdit, onSave, tabIndex, icon,
  type, style }) => {
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
      onChange={(event) => onEdit(editKey, event.target.value)}
      onBlur={(event) => onSave(editKey, event.target.value)}
      onKeyPress={(event) => event.key === 'Enter' &&
        onSave(editKey, event.target.value)}
      value={text}
    />
  )
}

EditText.propTypes = {
  editKey: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
  icon: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
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
  onSave: (editKey, text, cancelled) => dispatch(save(editKey, text, cancelled))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditText)