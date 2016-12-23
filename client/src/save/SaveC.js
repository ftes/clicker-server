import { connect } from 'react-redux'
import Button from '../components/Button'
import { saveAs } from 'file-saver'
import yaml from 'js-yaml'
import console from '../util/console'

const surpress = {
  buttonPress: true,
  editText: true,
  batteryLevel: true,
  showSettings: true,
}

const mapStateToProps = (state) => ({
  onClick: () => {
    let copy = { ...state }
    for (let key of Object.keys(surpress)) {
      delete copy[key]
    }
    try {
      let content = yaml.safeDump(copy)
      let file = new File(
        [content],
        state.className + '.yaml',
        { type: 'application/yaml' }
      )
      saveAs(file)
    } catch (error) {
      alert('Error saving file.')
      console.error(error)
    }
  },
  label: 'Save',
  glyph: 'save',
})

const mapDispatchToProps = () => ({})

const SaveC = connect(mapStateToProps, mapDispatchToProps)(Button)

export default SaveC