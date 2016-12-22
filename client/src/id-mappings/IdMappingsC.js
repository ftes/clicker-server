import { connect } from 'react-redux'
import IdMappings from './IdMappings'
import { edit } from '../edit-text'
import { keyPrefix } from './EditMappingC'
import { getDevices } from '../devices'

const local = (state) => state.idMappings

const mapStateToProps = (state) => ({
  mappings: local(state),
  devices: getDevices(state.devices),
})

const mapDispatchToProps = (dispatch) => ({
  editMapping: (deviceKey) => dispatch(edit(keyPrefix + deviceKey)),
})

const IdMappingsC = connect(mapStateToProps, mapDispatchToProps)(IdMappings)

export default IdMappingsC