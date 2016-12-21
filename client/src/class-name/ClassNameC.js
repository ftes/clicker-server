import { connect } from 'react-redux'
import ClassName from './ClassName'
import { edit, finish } from './'

const local = (state) => state.className

const mapStateToProps = (state) => ({
  edit: local(state).tmp !== undefined,
  className: local(state).tmp || local(state).name,
})

const mapDispatchToProps = (dispatch) => ({
  editCallback: (className) => dispatch(edit(className)),
  finishCallback: (cancelled) => dispatch(finish(cancelled))
})

const ClassNameC = connect(mapStateToProps, mapDispatchToProps)(ClassName)

export default ClassNameC