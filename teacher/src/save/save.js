import { connect } from 'react-redux'
import Button from '../components/button'
import { saveAs } from 'file-saver'
import yaml from 'js-yaml'
import console from '../common/console'

const mapStateToProps = (state) => ({
  onClick: () => {
    let copy = { ...state }

    // delete some entries
    delete copy.buttonPress
    delete copy.editText
    delete copy.batteryLevel
    delete copy.showSettings
    delete copy.devices.showdown
    delete copy.questions.countdown

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

export default connect(mapStateToProps, mapDispatchToProps)(Button)