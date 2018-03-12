import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { load } from './';
import { del } from '../util/js-object';
import console from '../util/console';

// COMPONENT
export class LocalStorage extends Component {
  componentWillMount() {
    this.readStateFromLocalStorage();

    // TODO not triggered on F5 refresh in chrome
    window.addEventListener('beforeunload', () => {
      console.log('Saving to localStorage before unload');
      this.saveStateToLocalStorage();
    });
  }

  readStateFromLocalStorage() {
    try {
      const json = this.props.readLocalStorage();
      const state = JSON.parse(json);
      if (state) this.props.load(state);
      console.log('Loaded from localStorage');
    } catch (error) {
      console.error('Could not read state from browser storage.', error);
    }
  }

  saveStateToLocalStorage() {
    const state = del(this.props.state, this.props.deleteOnSave);
    const json = JSON.stringify(state);
    this.props.setLocalStorage(json);
  }

  render() {
    return null;
  }
}

LocalStorage.propTypes = {
  state: PropTypes.object.isRequired,
  load: PropTypes.func.isRequired,
  readLocalStorage: PropTypes.func.isRequired,
  setLocalStorage: PropTypes.func.isRequired,
  deleteOnSave: PropTypes.object,
};

LocalStorage.defaultProps = {
  deleteOnSave: {},
};

// CONTAINER
const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  load: state => dispatch(load(state)),
  readLocalStorage: () => localStorage.getItem('redux-state'),
  setLocalStorage: value => localStorage.setItem('redux-state', value),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocalStorage);
