import { connect } from 'react-redux'
import App from './app'
import { getState as settings, set, fetchDefaultSettings } from '../settings'
import { setState } from '../core/reducers'

const mapStateToProps = (state) => ({
  showSettings: settings(state).show,
  getState: () => state,
})

const mapDispatchToProps = (dispatch) => ({
  setState: (state) => dispatch(setState(state)),
  setDeviceId: (deviceId) => dispatch(set('deviceId', deviceId)),
  fetchDefaultSettings: () => dispatch(fetchDefaultSettings()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)