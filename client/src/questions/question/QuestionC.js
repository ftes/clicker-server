import { connect } from 'react-redux'
import Question from './Question'
import { getName } from '../../device-name/DeviceNameC'

const mapStateToProps = (state, ownProps) => ({
  answeredBy: ownProps.answeredBy.map(deviceKey => getName(state, deviceKey)),
})

const mapDispatchToProps = () => ({})

const QuestionC = connect(mapStateToProps, mapDispatchToProps)(Question)

export default QuestionC