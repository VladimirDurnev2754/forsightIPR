require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', 'prettier'],
  extends: [
    'plugin:vue/vue3-essential', // базовые правила Vue 3
    '@vue/eslint-config-airbnb-with-typescript', // Airbnb + TypeScript
    'prettier',
    '@vue/eslint-config-prettier', // отключает конфликты с Prettier
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        endOfLine: 'auto',
      },
    ],
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/alt-text': 'off',
  },
  ignorePatterns: ['dist/', 'node_modules/'],
}
