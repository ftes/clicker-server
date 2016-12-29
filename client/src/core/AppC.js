import { connect } from 'react-redux'
import { overwrite } from './reducers'
import App from './App'
import { start as askQuestion } from '../questions/question'

const mapStateToProps = (state) => ({
  getState: () => state,
})

const mapDispatchToProps = (dispatch) => ({
  setState: (state) => dispatch(overwrite(state)),
  askQuestion: () => dispatch(askQuestion()),
})

const AppC = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppC