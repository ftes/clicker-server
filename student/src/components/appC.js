import { connect } from 'react-redux'
import App from './app'
import { getState as settings, set, fetchDefaultSettings, get as getSetting }
  from '../settings'
import { setState } from '../core/reducers'
import { connectWebsocket } from '../util/websocket'


const mapStateToProps = (state) => ({
  showSettings: settings(state).show,
  state: state,
})

const mapDispatchToProps = (dispatch) => ({
  setState: (state) => dispatch(setState(state)),
  setDeviceId: (deviceId) => dispatch(set('deviceId', deviceId)),
  fetchDefaultSettings: (state) => dispatch(fetchDefaultSettings(state)),
  connectWebsocket: (state) =>
    connectWebsocket(dispatch, getSetting(settings(state), 'server')),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)