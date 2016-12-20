import { connect } from 'react-redux'
import { requestBatteryLevel } from './'
import RequestBatteryLevel from './RequestBatteryLevel'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  requestBatteryLevel: () => dispatch(requestBatteryLevel())
})

const RequestBatteryLevelC = connect(mapStateToProps, mapDispatchToProps)(RequestBatteryLevel)

export default RequestBatteryLevelC