module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  parser: 'babel-eslint',
  rules: {
    'max-len': [1, { code: 80, tabWidth: 2, ignoreComments: true }],
    'react/prop-types': 0,
    'no-console': 0,
    'no-shadow': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        paths: ['src'],
      },
    },
  },
};
