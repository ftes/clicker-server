const path = require('path');

// `require` can only resolve files, not directories
const teacherPath = path.resolve(require.resolve('@clickr/teacher/build/index.html'), '..');
const whiteboardPath = path.resolve(require.resolve('@clickr/whiteboard/build/index.html'), '..');

module.exports = {
  use: [
    ['@neutrinojs/airbnb-base', {
      eslint: {
          rules: {
              'no-console': 'off',
              'no-plusplus': 'off',
          },
      },
    }],

    '@neutrinojs/node',
    
    ['@neutrinojs/jest', {
      testRegex: `src/.*\\.test\\.js$`,
    }],

    ['@neutrinojs/copy', {
      patterns: [
        {
          context: teacherPath,
          from: '**/*',
          to: 'static/teacher'
        }, {
          context: whiteboardPath,
          from: '**/*',
          to: 'static/whiteboard'
        },
      ],
    }],
  ],
};
