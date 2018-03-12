module.exports = {
  use: [
    
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
      testRegex: `src/.*\\.test\\.js$`,
    }],
  ],

  options: {
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
};
