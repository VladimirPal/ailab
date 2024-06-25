const path = require("path");

const packagesPath = path.resolve(__dirname, "../../packages");

module.exports = {
  extends: ["ui"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        packageDir: [
          path.resolve(__dirname, "."),
          // path.resolve(packagesPath, "components"),
          // ui-toolkit inside components dependencies
          // path.resolve(packagesPath, "ui-toolkit"),
          // path.resolve(packagesPath, "api-client"),
          // path.resolve(packagesPath, "utils"),
        ],
      },
    ],
  },
};
