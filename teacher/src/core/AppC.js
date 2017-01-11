import { connect } from 'react-redux'
import { overwrite } from './reducers'
import App from './App'
import { start as askQuestion } from '../questions/question'
import { connectWebsocket } from '../util/websocket'

const mapStateToProps = (state) => ({
  state: state,
})

const mapDispatchToProps = (dispatch) => ({
  setState: (state) => dispatch(overwrite(state)),
  askQuestion: () => dispatch(askQuestion()),
  connectWebsocket: () => connectWebsocket(dispatch),
})

const AppC = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppC