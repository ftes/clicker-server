import { connect } from 'react-redux'
import Offset from './Offset'
import { increase } from './'

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch) => ({
  increase: (deviceKey, value) => dispatch(increase(deviceKey, value))
})

const OffsetC =
  connect(mapStateToProps, mapDispatchToProps)(Offset)

export default OffsetC