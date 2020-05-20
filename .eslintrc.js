module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "eqeqeq": "warn",
    "indent": ["error", 2],
    "quotes": ["warn", "double"],
    "default-case": "error",
    "no-empty-function": "warn",
    "no-magic-numbers": ["error", { "ignore": [404, 200, -1, 1, 0, 32, 64] }],
    "array-bracket-spacing": ["error", "never"],
    "semi": ["error", "always"],
    "semi-style": ["error", "last"],
    "block-spacing": "error",
    "brace-style": ["error", "1tbs", { "allowSingleLine": false }],
    "capitalized-comments": ["error", "always", { "ignoreConsecutiveComments": true }],
    "func-call-spacing": ["error", "never"],
    "semi-spacing": ["error", { "before": false, "after": true }],
    "function-call-argument-newline": ["error", "never"],
    "function-paren-newline": ["error", "never"],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "line-comment-position": ["error", { "position": "above" }],
    "no-mixed-spaces-and-tabs": "error",
    "no-trailing-spaces": "error",
    "no-whitespace-before-property": "error",
    "object-curly-newline": ["error", { "ImportDeclaration": "never", }],
    "object-curly-spacing": ["error", "never"],
    "operator-linebreak": ["error", "after"],
    "space-before-blocks": "error",
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": ["error", "never"],
    "spaced-comment": ["error", "always"],
    "switch-colon-spacing": "error"
},
};
