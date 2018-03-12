import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPoints } from './';

// Component
export const PointsComponent = ({ points, style }) => (
  <span style={style}>{points}</span>
);

PointsComponent.propTypes = {
  points: PropTypes.number.isRequired, // provided by container
  style: PropTypes.object,
};

PointsComponent.defaultProps = {
  style: {},
};

// Container
const mapStateToProps = (state, ownProps) => ({
  points: getPoints(state, ownProps.deviceKey),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PointsComponent);
