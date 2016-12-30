import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import FA from 'react-fontawesome'

const EditText = ({ editKey, text, edit, onEdit, onSave, tabIndex, icon,
  type }) => {
  if (!edit) return (
    <div
      tabIndex={tabIndex || -1}
      onFocus={() => onEdit(editKey)}
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
}

export default EditText