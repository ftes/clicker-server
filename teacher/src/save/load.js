import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Button from '../components/button'
import { overwrite } from '../core/reducers'
import console from '../common/console'
import yaml from 'js-yaml'

// getInput must not be passed to Button 
//eslint-disable-next-line no-unused-vars
export const Load = ({ getInput, ...props }) => (
  <Button {...props}/>
)

Load.propTypes = {
  getInput: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({})

let added = false

const mapDispatchToProps = (dispatch, { getInput }) => ({
  onClick: () => {
    let input = getInput()
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

export default connect(mapStateToProps, mapDispatchToProps)(Load)