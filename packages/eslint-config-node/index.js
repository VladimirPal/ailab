module.exports = {
  env: {
    browser: false,
    node: true,
    mocha: true,
    es2022: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["prettier"],
  globals: {
    log: "readonly",
  },
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "no-param-reassign": "off",
    "import/prefer-default-export": "off",
  },
};
