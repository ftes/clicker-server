import { connect } from 'react-redux'
import Buttons from './buttons'
import { getState as settings, get } from '../settings'

const mapStateToProps = (state) => ({
  numberOfButtons: get(settings(state), 'nButtons'),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)