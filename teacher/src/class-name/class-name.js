import { connect } from 'react-redux'
import EditText from '../edit-text/edit-text'

const local = (state) => state.className

const mapStateToProps = (state) => ({
  editKey: 'className',
  defaultText: local(state),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EditText)