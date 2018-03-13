import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

import { toggle, getState as local } from './';

const ShowSettingsComponent = ({ active }) => (
  <li
    className={classNames('nav-item', {
      active,
    })}
  >
    <FontAwesome name="wrench" />
    &nbsp;
    Settings
  </li>
);

ShowSettingsComponent.propTypes = {
  active: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  className: classNames({
    active: local(state),
  }),
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(toggle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowSettingsComponent);
