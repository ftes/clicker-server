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
      }
    }],
    
    ['@neutrinojs/jest', {
      testRegex: `\\.test\\.(js|jsx)$`,
      setupTestFrameworkScriptFile: './test-setup.js',
    }],
  ]
};
