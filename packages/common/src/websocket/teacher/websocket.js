import { connect } from 'react-redux';

import Websocket from '../websocket';

import { bind } from './';

// CONTAINER
const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  bind: () => bind(dispatch, ownProps.port),
});

export default connect(mapStateToProps, mapDispatchToProps)(Websocket);
