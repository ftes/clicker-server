import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

import { toggle, getState as local } from './';

const ShowSettingsComponent = ({ active, onClick }) => (
  <button
    className={classNames('nav-item', 'btn', 'btn-outline-secondary', {
      active,
    })}
    onClick={onClick}
  >
    <FontAwesome name="wrench" />
    &nbsp;
    Settings
  </button>
);

ShowSettingsComponent.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  active: local(state),
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(toggle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowSettingsComponent);
