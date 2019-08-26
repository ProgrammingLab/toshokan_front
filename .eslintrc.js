module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'airbnb-base',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
  },
  settings: {
    "import/resolver": {
      "babel-module": {
          "root": ".",
          "alias": {
              "~": ".",
              "@": ".",
              "~~": ".",
              "@@": "."
          }
      }
    }
  }
}
