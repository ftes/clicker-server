import React, { PropTypes } from 'react'

export const Lesson = ({ lesson, ...props }) => (
  <div {...props}>
    {lesson.date.toLocaleDateString()}
    &nbsp;
    {lesson.title || ''}
  </div>
)

Lesson.propTypes = {
  lesson: PropTypes.object.isRequired,
}

export default Lesson
