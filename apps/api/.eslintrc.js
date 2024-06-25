const path = require("path");

module.exports = {
  extends: ["node"],
  globals: {
    appConfig: "readonly",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["app-config", "./config/index.js"]],
        extensions: [".js", ".json"],
      },
    },
  },
};
