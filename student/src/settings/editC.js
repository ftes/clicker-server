import { connect } from 'react-redux'
import Edit from './edit'
import { getState as local, set, toggleShow, reset } from './'
import { bind as bindWebsocket } from '../websocket'

const mapStateToProps = (state) => ({
  settings: local(state),
})

const mapDispatchToProps = (dispatch) => ({
  set: (key, value) => dispatch(set(key, value)),
  reset: () => dispatch(reset()),
  toggleShow: () => dispatch(toggleShow()),
  connectWebsocket: (uri) => bindWebsocket(dispatch, uri),
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)