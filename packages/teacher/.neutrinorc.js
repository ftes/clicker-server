module.exports = {
  use: [
    ['@neutrinojs/airbnb', {
      eslint: {
        rules: {
          'jsx-a11y/click-events-have-key-events': 'off',
          'jsx-a11y/no-noninteractive-element-interactions': 'off',
        },
      },
    }],
    
    ['@neutrinojs/react', {
      devServer: {
        port: 4001,
      },
      // TODO pass object with default value (https://github.com/mozilla-neutrino/neutrino-dev/pull/749)
      env: [ 'CLICKR_SERVER_PORT' ],
    }],
    
    ['@neutrinojs/jest', {
      testRegex: `\\.test\\.(js|jsx)$`,
      setupTestFrameworkScriptFile: './test-setup.js',
    }],
  ]
};
