import { connect } from 'react-redux'
import { saveAs } from 'file-saver'
import yaml from 'js-yaml'

import { Button } from '@clickr/common/lib/components'
import { console } from '@clickr/common/lib/util'
import { del } from '@clickr/common/lib/util'

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