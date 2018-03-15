module.exports = {
  use: [
    ['@neutrinojs/airbnb', {
      eslint: {
        rules: {
          'react/forbid-prop-types': 'off',
        },
      },
    }],
    
    ['@neutrinojs/react', {
      devServer: {
        port: 4003,
      },
      env: [ 'CLICKR_SERVER_CONFIG_URL' ],
    }],
    
    ['@neutrinojs/jest', {
      testRegex: `\\.test\\.(js|jsx)$`,
      setupTestFrameworkScriptFile: './test-setup.js'
    }],
  ]
};
