module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue', // eslint-plugin-vue
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', //
    'prettier',
    'prettier/vue',
  ],
  rules: {
    /**
     * 0: off,
     * 1: warn,
     * 2: error
     */
  },
};
