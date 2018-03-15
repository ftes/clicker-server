module.exports = {
  use: [
    '@neutrinojs/airbnb',
    
    ['@neutrinojs/react', {
      devServer: {
        port: 4002,
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
