import { connect } from 'react-redux'
import App from './app'
import { getState as settings } from '../settings'
import { toggleShow as toggleShowSettings } from '../settings'


const mapStateToProps = (state) => ({
  showSettings: settings(state).show,
})

const mapDispatchToProps = (dispatch) => ({
  toggleShowSettings: () => dispatch(toggleShowSettings()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)