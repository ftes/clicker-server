import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'

const ClassName = ({ className, edit, editCallback, finishCallback }) => {
  if (!edit) return (
    <span
      tabIndex='-1'
      onFocus={() => editCallback()}
      title='Click to edit'
    >
      {className}
    </span>
  )

  return (
    <FormControl
      autoFocus
      type='text'
      onChange={(event) => editCallback(event.target.value)}
      onBlur={() => finishCallback()}
      onKeyPress={(event) => event.key === 'Enter' && finishCallback()}
      value={className}
    />
  )
}

ClassName.propTypes = {
  className: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  editCallback: PropTypes.func.isRequired,
  finishCallback: PropTypes.func.isRequired,
}

export default ClassName