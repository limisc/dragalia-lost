module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },
  env: { browser: true, es6: true },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx'], paths: ['src'] },
    },
  },
  rules: {
    'react/prop-types': 'off',
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      { labelAttributes: ['label'] },
    ],
  },
};
