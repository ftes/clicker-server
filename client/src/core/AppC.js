import { connect } from 'react-redux'
import { overwrite } from './reducers'
import App from './App'

const mapStateToProps = (state) => ({
  getState: () => state,
})

const mapDispatchToProps = (dispatch) => ({
  setState: (state) => dispatch(overwrite(state)),
})

const AppC = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppC