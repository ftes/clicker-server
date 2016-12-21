import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'

const EditText = ({ editKey, text, edit, onEdit, onSave, tabIndex }) => {
  if (!edit) return (
    <span
      tabIndex={tabIndex || -1}
      onFocus={() => onEdit(editKey)}
    >
      {text}
    </span>
  )

  return (
    <FormControl
      autoFocus
      tabIndex={tabIndex}
      type='text'
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
}

export default EditText