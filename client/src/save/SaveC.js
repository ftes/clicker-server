import { connect } from 'react-redux'
import Button from '../components/Button'
import { saveAs } from 'file-saver'

const mapStateToProps = (state) => ({
  onClick: () => {
    let file = new File(
      [JSON.stringify(state)],
      'clicker.json',
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