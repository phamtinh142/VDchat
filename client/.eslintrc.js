module.exports = {
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
  "env": {
    "browser": true,
    "es2020": true,
    "es6": true,
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "js": true,
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
    "import/named": 0,
    "no-underscore-dangle": 0,
    "import/no-cycle": 0,
    "require-yield": 0
  }
};
