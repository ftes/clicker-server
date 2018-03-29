import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

import { set } from '@clickr/common/lib/sync';

const SyncComponent = ({ onClick, enabled }) => (
  <button
    className={classNames('btn btn-outline-secondary', {
      active: enabled,
    })}
    onClick={onClick}
  >
    <FontAwesome name="refresh" />
    &nbsp;
    Sync
  </button>
);

SyncComponent.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(set(!ownProps.enabled)),
});

const Sync = connect(mapStateToProps, mapDispatchToProps)(SyncComponent);

export default Sync;
