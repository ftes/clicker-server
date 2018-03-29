const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  use: [
    ['@neutrinojs/airbnb', {
      eslint: {
        rules: {
          'react/forbid-prop-types': 'off',
          'no-plusplus': 'off',
          'jsx-a11y/click-events-have-key-events': 'off',
          'jsx-a11y/no-noninteractive-element-interactions': 'off',
        },
      },
    }],

    ['@neutrinojs/library', {
      name: '@clickr/common',
      babel: {
        plugins: [
          [
            require.resolve('babel-plugin-transform-react-jsx'),
            { pragma: 'createElement' },
          ],
          [
            require.resolve('babel-plugin-jsx-pragmatic'),
            {
              module: 'react',
              export: 'createElement',
              import: 'createElement',
            }
          ],
          require.resolve('babel-plugin-transform-object-rest-spread'),
          [require.resolve('babel-plugin-transform-class-properties'), { spec: true }],
        ],
        presets: [require.resolve('babel-preset-react')]
      },
    }],

    ['@neutrinojs/style-loader', {
      extract: false,
    }],

    ['@neutrinojs/jest', {
      testRegex: `src/.*\\.test\\.(js|jsx)$`,
      setupTestFrameworkScriptFile: './test-setup.js',
    }],

    // disable source maps (source-map-support is problematic in web projects that include common)
    neutrino => neutrino.config.devtool(false),
    neutrino => neutrino.config.plugins.delete('babel-minify'),
  ],

  options: {
    output: 'lib',

    mains: {
      'battery-level': 'battery-level',
      'button-press': 'button-press',
      'class-name': 'class-name',
      'components': 'components',
      'device-name': 'device-name',
      'devices': 'devices',
      'edit-text': 'edit-text',
      'id-mappings': 'id-mappings',
      'lessons': 'lessons',
      'offset': 'offset',
      'questions': 'questions',
      'save': 'save',
      'show-settings': 'show-settings',
      'sync': 'sync',
      'time-offset': 'time-offset',
      'util': 'util',
      'websocket': 'websocket',
    },
  },

  env: {
    ANALYZE: {
      true: {
        use: [
          neutrino => neutrino.config.plugin('bundleAnalyzer').use(BundleAnalyzerPlugin),
        ]
      }
    }
  },
};
