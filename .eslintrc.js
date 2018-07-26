module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/label-has-for': [
      'error',
      {
        'required': {
          'some': [ 'nesting', 'id' ]
        }
      }
    ]
  },
  env: {
    jest: true
  },
  parser: 'babel-eslint',
  globals: {
    window: true,
    document: true,
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
};
