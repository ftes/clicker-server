import { connect } from 'react-redux'
import { saveAs } from 'file-saver'
import yaml from 'js-yaml'

import Button from '../common/components/button'
import console from '../common/util/console'
import { del } from '../common/util/js-object'

import { deleteOnFileSave } from '../core/reducers'

const mapStateToProps = (state) => ({
  onClick: () => {
    state = del(state, deleteOnFileSave)

    try {
      let content = yaml.dump(state)
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