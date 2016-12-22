import { connect } from 'react-redux'
import EditText from '../edit-text/EditTextC'

export const keyPrefix = 'idMappings/'

const mapStateToProps = (state, ownProps) => ({
  editKey: keyPrefix + ownProps.deviceKey,
  defaultText: ownProps.mappedId || '',
})

const mapDispatchToProps = () => ({})

const EditMappingC = connect(mapStateToProps, mapDispatchToProps)(EditText)

export default EditMappingC