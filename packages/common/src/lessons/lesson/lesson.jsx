import React from 'react';
import PropTypes from 'prop-types';

export const LessonComponent = ({ lesson, ...props }) => (
  <div {...props}>
    {lesson.date.toLocaleDateString()}
    &nbsp;
    {lesson.title || ''}
  </div>
);

LessonComponent.propTypes = {
  lesson: PropTypes.object.isRequired,
};

export default LessonComponent;
