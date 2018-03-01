import { connect } from 'react-redux'

import Websocket from '@clickr/common/lib/websocket/websocket'

import { bind } from './'
import { getState as settings, get as getSetting } from '../settings'

// CONTAINER
const mapStateToProps = (state) => ({
  server: getSetting(settings(state), 'server'),
})

const mergeProps = (stateProps, dispatchProps) => ({
  bind: () => bind(dispatchProps.dispatch, stateProps.server),
})

export default connect(mapStateToProps, undefined, mergeProps)(Websocket)