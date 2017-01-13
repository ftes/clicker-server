import { connect } from 'react-redux'
import App from './app'
import { getState as settings }
  from '../settings'


const mapStateToProps = (state) => ({
  showSettings: settings(state).show,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)