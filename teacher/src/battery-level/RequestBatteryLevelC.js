import { connect } from 'react-redux'
import { request } from './'
import Button from '../components/Button'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onClick: () =>  dispatch(request()),
  faIcon: 'battery-half',
  label: 'Update Battery Levels',
})

const RequestBatteryLevelC =
  connect(mapStateToProps, mapDispatchToProps)(Button)

export default RequestBatteryLevelC