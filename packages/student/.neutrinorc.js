module.exports = {
  use: [
    ['@neutrinojs/react', {
      devServer: {
        port: 4003,
      },
      env: [ 'CLICKR_SERVER_CONFIG_URL' ]
    }],
    
    ['@neutrinojs/jest', {
      testRegex: `\\.test\\.js$`,
      setupTestFrameworkScriptFile: './test-setup.js'
    }],
  ]
};
