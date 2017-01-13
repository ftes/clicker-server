import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { overwrite } from './'

// COMPONENT
export class LocalStorage extends Component {
  componentWillMount() {
    this.readStateFromLocalStorage()
    window.addEventListener('beforeunload',
      () => this.saveStateToLocalStorage())
  }

  readStateFromLocalStorage() {
    try {
      let state = JSON.parse(this.props.readLocalStorage())
      if (state) this.props.overwrite(state)
    } catch (error) {
      window.alert('Could not read state from browser storage.')
      console.error(error)
    }
  }

  saveStateToLocalStorage() {
    let state = { ...this.props.state }
    let json = JSON.stringify(state)
    this.props.setLocalStorage(json)
  }

  render() {
    return null
  }
}

LocalStorage.propTypes = {
  state: PropTypes.object.isRequired,
  overwrite: PropTypes.func.isRequired,
  readLocalStorage: PropTypes.func.isRequired,
  setLocalStorage: PropTypes.func.isRequired,
}

// CONTAINER
const mapStateToProps = (state) => ({
  state,
})

const mapDispatchToProps = (dispatch) => ({
  overwrite: (state) => dispatch(overwrite(state)),
  readLocalStorage: () => localStorage.getItem('redux-state'),
  setLocalStorage: (value) => localStorage.setItem('redux-state', value),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalStorage)