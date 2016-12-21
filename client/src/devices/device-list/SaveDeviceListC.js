import { connect } from 'react-redux'
import Button from '../../components/Button'
import saveAs from 'file-saver'

const mapStateToProps = (state) => ({
  callback: () => {
    let file = new File(
      JSON.stringify(state.devices.deviceList),
      'devices.json',
      { type: 'application/json' }
    )
    saveAs(file)
  },
  label: 'Save Device List',
  glyph: 'save'
})

const mapDispatchToProps = () => ({})

const SaveDeviceListC = connect(mapStateToProps, mapDispatchToProps)(Button)

export default SaveDeviceListC