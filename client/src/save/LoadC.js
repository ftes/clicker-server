import { connect } from 'react-redux'
import Button from '../components/Button'
import { saveAs } from 'file-saver'

const mapStateToProps = (state) => ({
  callback: () => {
    let file = new File(
      JSON.stringify(state),
      'clicker.json',
      { type: 'application/json' }
    )
    saveAs(file)
  },
  label: 'Load',
  glyph: 'open'
})

const mapDispatchToProps = () => ({})

const SaveC = connect(mapStateToProps, mapDispatchToProps)(Button)

export default SaveC