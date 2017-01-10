import { connect } from 'react-redux'
import Settings from './settings'
import { getState as local } from './'

const mapStateToProps = (state) => ({
  unlocked: local(state).unlocked
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)