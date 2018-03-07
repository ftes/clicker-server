import { connect } from 'react-redux'
import { addEmpty } from './'
import { Button } from '../../components'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(addEmpty()),
  label: 'Add Empty Element',
  faIcon: 'tag'
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)