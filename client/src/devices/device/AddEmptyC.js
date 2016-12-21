import { connect } from 'react-redux'
import { addEmpty } from './'
import Button from '../../components/Button'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  callback: () => dispatch(addEmpty()),
  label: 'Add Empty Element',
  faIcon: 'tag'
})

const AddEmptyC = connect(mapStateToProps, mapDispatchToProps)(Button)

export default AddEmptyC