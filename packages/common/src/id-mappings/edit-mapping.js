import { connect } from 'react-redux'
import EditText from '../edit-text/edit-text'

export const keyPrefix = 'idMappings/'

const mapStateToProps = (state, ownProps) => ({
  editKey: keyPrefix + ownProps.deviceKey,
  defaultText: ownProps.mappedId || '',
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(EditText)