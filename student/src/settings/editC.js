import { connect } from 'react-redux'
import Edit from './edit'
import { getState as local, set, toggleShow, reset } from './'
import { reconnect } from '../websocket'

const mapStateToProps = (state) => ({
  settings: local(state),
})

const mapDispatchToProps = (dispatch) => ({
  set: (key, value) => dispatch(set(key, value)),
  reset: () => dispatch(reset()),
  toggleShow: () => dispatch(toggleShow()),
  reconnect: () => dispatch(reconnect()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)