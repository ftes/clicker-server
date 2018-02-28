import { connect } from 'react-redux'

import Button from '../common/components/button'
import { reset } from '../common/save'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(reset()),
  label: 'Reset',
  faIcon: 'undo',
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)