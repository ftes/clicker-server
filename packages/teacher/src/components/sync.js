import { connect } from 'react-redux'
import { PropTypes } from 'react'

import Button from '@clickr/common/lib/components/button'
import { set } from '@clickr/common/lib/sync'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.enabled,
  glyph: 'refresh',
  label: 'Sync',
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(set(!ownProps.enabled))
})

// prevent 'enabled' from being added
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  Wrapper: ownProps.Wrapper,
})

const Sync = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Button)

Sync.propTypes = {
  enabled: PropTypes.bool.isRequired,
}

export default Sync
