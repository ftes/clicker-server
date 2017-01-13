import { connect } from 'react-redux'
import Button from '../components/button'
import { reset } from '../core/reducers'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(reset()),
  label: 'Reset',
  faIcon: 'undo',
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)