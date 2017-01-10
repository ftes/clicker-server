import { connect } from 'react-redux'
import EditText from '../edit-text/EditTextC'

const local = (state) => state.className

const mapStateToProps = (state) => ({
  editKey: 'className',
  defaultText: local(state),
})

const mapDispatchToProps = () => ({})

const ClassNameC = connect(mapStateToProps, mapDispatchToProps)(EditText)

export default ClassNameC