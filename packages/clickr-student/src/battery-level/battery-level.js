import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { set } from './'

// COMPONENT
export class BatteryLevel extends Component {
  constructor(props) {
    super(props)
    this.onBatteryStatus = this.onBatteryStatus.bind(this)
  }

  componentWillMount() {
    window.addEventListener('batterystatus', this.onBatteryStatus)
  }

  componentWillUnmount() {
    window.removeEventListener('batterystatus', this.onBatteryStatus)
  }

  onBatteryStatus(status) {
    this.props.set(status.level / 100)
  }

  render() {
    return null
  }
}

BatteryLevel.propTypes = {
  set: PropTypes.func.isRequired,
}

// CONTAINER
const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  set: (level) => dispatch(set(level))
})

export default connect(mapStateToProps, mapDispatchToProps)(BatteryLevel)