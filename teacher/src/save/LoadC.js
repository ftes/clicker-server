import { connect } from 'react-redux'
import Button from '../components/Button'
import { overwrite } from '../core/reducers'
import console from '../util/console'
import yaml from 'js-yaml'

const mapStateToProps = () => ({})

let added = false

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    let input = ownProps.getInput()
    if (!added) {
      added = true
      input.addEventListener('change', e => {
        let files = e.target.files
        if (files.length > 0) {
          let reader = new FileReader()
          reader.onloadend = e => {
            if (e.target.readyState === FileReader.DONE) {
              try {
                let state = yaml.safeLoad(e.target.result)
                dispatch(overwrite(state))
              } catch (error) {
                alert('Error loading file.')
                console.error(error)
              }
            }
          }
          reader.readAsText(files[0])
        }
      }, false)
    }
    input.click()
  },
  label: 'Load',
  glyph: 'open',
})

const LoadC = connect(mapStateToProps, mapDispatchToProps)(Button)

export default LoadC