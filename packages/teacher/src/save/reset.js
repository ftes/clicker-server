import { connect } from 'react-redux'

import { Button } from '@clickr/common/lib/components'
import { reset } from '@clickr/common/lib/save'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(reset()),
  label: 'Reset',
  faIcon: 'undo',
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)