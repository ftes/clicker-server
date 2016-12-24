import { connect } from 'react-redux'
import Dropdown from './Dropdown'
import { save } from './'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onChange: (key, value) => dispatch(save(key, value)),
})

const DropdownC = connect(mapStateToProps, mapDispatchToProps)(Dropdown)

export default DropdownC