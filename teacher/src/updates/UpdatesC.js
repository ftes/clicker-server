import { connect } from 'react-redux'
import Updates from './Updates'
import { update, checkUpdates, getState as local } from './'
import { getState as showSettings } from '../show-settings'

const mapStateToProps = (state) => ({
  state: local(state),
  showSettings: showSettings(state),
})

const mapDispatchToProps = (dispatch) => ({
  checkUpdates: () => dispatch(checkUpdates()),
  update: () => dispatch(update()),
})

const UpdatesC =
  connect(mapStateToProps, mapDispatchToProps)(Updates)

export default UpdatesC