import { connect } from 'react-redux'

import Websocket from '../websocket'

import { bind } from './'

// CONTAINER
const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  bind: () => bind(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Websocket)