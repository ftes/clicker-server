import { connect } from 'react-redux'
import { addNewLine } from './'
import Button from '../../components/Button'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  callback: () => dispatch(addNewLine()),
  label: 'Add New Line',
  glyph: 'triangle-bottom'
})

const AddNewLineC = connect(mapStateToProps, mapDispatchToProps)(Button)

export default AddNewLineC