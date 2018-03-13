import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getName } from '../../device-name/device-name';
import { onlyShown } from './';
import { getState as getSettingsState } from '../settings';

// Component
export const QuestionComponent = ({ title, answeredBy, settings }) => {
  let i = 0;

  return (
    <span>
      <b>{title} ({answeredBy.length}) </b>
      {settings.showWhoAnswered &&
        answeredBy.map(name => (
          <span
            className="badge badge-success"
            key={i++}
            style={{
              marginRight: '5px',
              display: 'inline-block',
            }}
          >
            {name}
          </span>
        ))}
    </span>
  );
};

QuestionComponent.propTypes = {
  title: PropTypes.string.isRequired,
  answeredBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  settings: PropTypes.object.isRequired,
};

// Container
const mapStateToProps = (state, ownProps) => ({
  answeredBy: onlyShown(ownProps.answeredBy, state)
    .map(deviceKey => getName(state, deviceKey)),
  settings: getSettingsState(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);
