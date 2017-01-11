import { connect } from 'react-redux'
import { requestBatteryLevel } from './'
import Button from '../components/Button'

const mapStateToProps = () => ({
  onClick: () =>  requestBatteryLevel(),
  faIcon: 'battery-half',
  label: 'Update Battery Levels',
})

const mapDispatchToProps = () => ({})

const RequestBatteryLevelC =
  connect(mapStateToProps, mapDispatchToProps)(Button)

export default RequestBatteryLevelC