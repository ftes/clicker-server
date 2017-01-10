import { connect } from 'react-redux'
import Points from './Points'
import { getPoints } from './'

const mapStateToProps = (state, ownProps) => ({
  points: getPoints(state, ownProps.deviceKey),
})

const mapDispatchToProps = () => ({})

const PointsC =
  connect(mapStateToProps, mapDispatchToProps)(Points)

export default PointsC