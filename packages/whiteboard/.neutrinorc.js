module.exports = {
  use: [
    '@neutrinojs/react',
    [
    '@neutrinojs/jest',
      {
        testRegex: `\\.test\\.js$`,
        setupTestFrameworkScriptFile: './test-setup.js',
      },
    ],
  ]
};
