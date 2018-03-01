import { connect } from 'react-redux'
import Button from '../components/button'
import { toggle } from './'
import { getState as local } from './'

const mapStateToProps = (state) => ({
  active: local(state),
  label: 'Settings',
  faIcon: 'wrench',
})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(toggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)