import { connect } from 'react-redux'
import Button from '../components/Button'
import { reset } from '../core/reducers'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(reset()),
  label: 'Reset',
  faIcon: 'undo',
})

const ResetC = connect(mapStateToProps, mapDispatchToProps)(Button)

export default ResetC