import { connect } from 'react-redux'
import Button from '../components/Button'
import { saveAs } from 'file-saver'

const overwrite = {
  batteryLevel: {},
}

const mapStateToProps = (state) => ({
  onClick: () => {
    let overwritten = {
      ...state,
      ...overwrite,
    }
    let file = new File(
      [JSON.stringify(overwritten)],
      state.className + '.json',
      { type: 'application/json' }
    )
    saveAs(file)
  },
  label: 'Save',
  glyph: 'save',
})

const mapDispatchToProps = () => ({})

const SaveC = connect(mapStateToProps, mapDispatchToProps)(Button)

export default SaveC