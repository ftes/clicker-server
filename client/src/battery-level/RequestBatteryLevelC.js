import { connect } from 'react-redux'
import { requestBatteryLevel } from './'
import Button from '../components/Button'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  faIcon: 'battery-half',
  label: 'Update Battery Levels',
  onClick: () => dispatch(requestBatteryLevel()),
})

const RequestBatteryLevelC =
  connect(mapStateToProps, mapDispatchToProps)(Button)

export default RequestBatteryLevelC