import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import { reset } from '@clickr/common/lib/save';

const ResetComponent = ({ onClick }) => (
  <button
    className="btn btn-outline-secondary"
    onClick={onClick}
  >
    <FontAwesome name="undo" />
    &nbsp;
    Reset
  </button>
);

ResetComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetComponent);
