import { connect } from 'react-redux'
import Countdown from './Countdown'
import { clear } from './'
import { getState as local } from './'

const mapStateToProps = (state) => ({
  end: local(state)
})

const mapDispatchToProps = (dispatch) => ({
  clearCallback: () => dispatch(clear())
})

const CountdownC = connect(mapStateToProps, mapDispatchToProps)(Countdown)

export default CountdownC