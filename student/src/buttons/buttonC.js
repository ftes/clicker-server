import { connect } from 'react-redux'
import Button from './button'
import { press, getState as local } from './'


const mapStateToProps = (state, ownProps) => ({
  pressed: local(state)[ownProps.number],
})

const mapDispatchToProps = (dispatch) => ({
  onPress: (number, pressed) => dispatch(press(number, pressed)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)