import { connect } from 'react-redux'
import Unlock from './unlock'
import { unlock, getState as local, toggleShow } from './'

const mapStateToProps = (state) => ({
  unlockFailed: local(state).unlockFailed,
})

const mapDispatchToProps = (dispatch) => ({
  unlock: (pin) => dispatch(unlock(pin)),
  toggleShow: () => dispatch(toggleShow()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Unlock)