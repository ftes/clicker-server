import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bind } from './'

// COMPONENT
export class Websocket extends Component {
  componentWillMount() {
    this.props.bind()
  }

  render() {
    return null
  }
}

Websocket.propTypes = {
  bind: PropTypes.func.isRequired,
}

// CONTAINER
const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  bind: () => bind(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Websocket)