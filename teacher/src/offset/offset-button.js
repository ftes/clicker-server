import { PropTypes } from 'react'
import { connect } from 'react-redux'

import Button from '../components/button'
import { increase } from './'

// Container
const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { deviceKey, by }) => ({
  onClick: () => dispatch(increase(deviceKey, by))
})

const OffsetButton = connect(mapStateToProps, mapDispatchToProps)(Button)

OffsetButton.propTypes = {
  deviceKey: PropTypes.string.isRequired,
  by: PropTypes.number.isRequired,
}

export default OffsetButton