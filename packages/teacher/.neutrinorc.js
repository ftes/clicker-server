module.exports = {
  use: [
    '@neutrinojs/airbnb',
    
    ['@neutrinojs/react', {
      devServer: {
        port: 4001,
      }
    }],
    
    ['@neutrinojs/jest', {
      testRegex: `\\.test\\.(js|jsx)$`,
      setupTestFrameworkScriptFile: './test-setup.js',
    }],
  ]
};
