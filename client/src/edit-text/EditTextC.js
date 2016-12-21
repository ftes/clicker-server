import { connect } from 'react-redux'
import EditText from './EditText'
import { edit, save } from './'

const local = (state) => state.editText

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

const EditTextC = connect(mapStateToProps, mapDispatchToProps)(EditText)

export default EditTextC