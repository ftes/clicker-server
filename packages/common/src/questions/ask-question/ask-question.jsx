import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { start } from '../question';
import { getNextId } from '../question-list';
import { getState as local, editTitle } from './';

// Component
export const AskQuestion = ({
  onEdit, startCallback, nextId, title,
}) => (
  <div className="form-group">
    <input
      type="text"
      onKeyPress={e => e.key === 'Enter' && startCallback()}
      onChange={e => onEdit(e.target.value)}
      placeholder={`Question ${nextId}`}
      value={title}
      style={{
        width: '110px',
      }}
    />
    {' '}
    <button
      className="btn"
      onClick={() => this.props.startCallback()}
    >
      Ask
    </button>
  </div>
);

AskQuestion.propTypes = {
  startCallback: PropTypes.func.isRequired,
  nextId: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

// Container
const mapStateToProps = state => ({
  title: local(state),
  nextId: getNextId(state),
});

const mapDispatchToProps = dispatch => ({
  startCallback: () => dispatch(start()),
  onEdit: title => dispatch(editTitle(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);
