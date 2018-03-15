import { Component } from 'react';
import PropTypes from 'prop-types';

// COMPONENT
export default class Websocket extends Component {
  componentWillMount() {
    const { bind, port } = this.props;
    bind(port);
  }

  render() {
    return null;
  }
}

Websocket.propTypes = {
  bind: PropTypes.func.isRequired,
  port: PropTypes.string,
};

Websocket.defaultProps = {
  port: undefined,
};
