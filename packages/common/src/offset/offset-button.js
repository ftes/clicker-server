import { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Button } from '../components'
import { increase } from './'

// Container
const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch, { deviceKey, by }) => ({
  onClick: () => dispatch(increase(deviceKey, by))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const copy = {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  }
  delete copy.deviceKey
  return copy
}

const OffsetButton =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(Button)

OffsetButton.propTypes = {
  deviceKey: PropTypes.string.isRequired,
  by: PropTypes.number.isRequired,
}

export default OffsetButton