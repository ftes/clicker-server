import { connect } from 'react-redux'
import IdMappings from './IdMappings'
import { edit } from '../edit-text'
import { keyPrefix } from './EditMappingC'
import { getDevices } from '../devices/device-list'
import { getState as local } from './'

const mapStateToProps = (state) => ({
  mappings: local(state),
  devices: getDevices(state),
})

const mapDispatchToProps = (dispatch) => ({
  editMapping: (deviceKey) => dispatch(edit(keyPrefix + deviceKey)),
})

const IdMappingsC = connect(mapStateToProps, mapDispatchToProps)(IdMappings)

export default IdMappingsC