import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { start } from '../question';
import { getNextId } from '../question-list';
import { getState as local, editTitle } from './';

// Component
export const AskQuestion = ({
  onEdit, startCallback, nextId, title,
}) => (
  <FormGroup>
    <FormControl
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
    <Button
      type="submit"
      onClick={() => this.props.startCallback()}
    >
      Ask
    </Button>
  </FormGroup>
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
