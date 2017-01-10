import { connect } from 'react-redux'
import Navbar from './navbar'
import { toggleShow as toggleShowSettings } from '../settings'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  toggleShowSettings: () => dispatch(toggleShowSettings()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)