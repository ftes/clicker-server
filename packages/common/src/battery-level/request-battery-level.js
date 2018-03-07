import { connect } from 'react-redux'
import { request } from './'
import { Button } from '../components'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  onClick: () =>  dispatch(request()),
  faIcon: 'battery-half',
  label: 'Update Battery Levels',
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)