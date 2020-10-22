module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'func-names': 0,
    'max-classes-per-file': 0,
    'no-underscore-dangle': 0,
    'no-trailing-spaces': 0,
    'max-len': 0,
    'eol-last': 0,
    'arrow-body-style': 0,
  },
};
