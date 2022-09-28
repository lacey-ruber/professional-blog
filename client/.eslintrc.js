module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'never'],
    indent: [0, 2],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }
    ],
    'multiline-ternary': ['off'],
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true, avoidEscape: true }
    ],
    'react/prop-types': 0,
    'react/no-children-prop': 0
  }
}
