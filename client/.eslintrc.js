module.exports = {
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "eol-last": 0,
    "no-trailing-spaces": 0,
    "react/no-unescaped-entities": 0,
    "no-use-before-define": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-boolean-value": 0,
    "no-param-reassign": 0,
    "max-len": 0,
    "import/named": 0
  }
};
