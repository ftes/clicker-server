import { Component } from 'react';
import PropTypes from 'prop-types';

// COMPONENT
export default class Websocket extends Component {
  componentWillMount() {
    this.props.bind();
  }

  render() {
    return null;
  }
}

Websocket.propTypes = {
  bind: PropTypes.func.isRequired,
};
