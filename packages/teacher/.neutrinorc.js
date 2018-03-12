module.exports = {
  use: [
    ['@neutrinojs/react', {
      devServer: {
        port: 4001,
      }
    }],
    
    ['@neutrinojs/jest', {
      testRegex: `\\.test\\.js$`,
      setupTestFrameworkScriptFile: './test-setup.js',
    }],
  ]
};
