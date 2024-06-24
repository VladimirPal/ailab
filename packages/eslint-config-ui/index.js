module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["prettier", "react"],
  globals: {
    log: "readonly",
  },
  rules: {
    "prettier/prettier": "error",
    "max-classes-per-file": "off",
    "no-underscore-dangle": "off",
    "react/function-component-definition": "off",
    "arrow-body-style": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "off",
    "react/no-unescaped-entities": "off",
    "no-param-reassign": "off",
    "import/prefer-default-export": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
};
