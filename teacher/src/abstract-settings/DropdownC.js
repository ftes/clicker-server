import { connect } from 'react-redux'
import Dropdown from './Dropdown'
import { save } from './'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onChange: (editKeyPrefix, key, value) =>
    dispatch(save(editKeyPrefix, key, value)),
})

const DropdownC = connect(mapStateToProps, mapDispatchToProps)(Dropdown)

export default DropdownC