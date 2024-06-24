const path = require("path");

module.exports = (env) => ({
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    fallback: {
      path: false,
      os: false,
      fs: false,
      module: false,
    },
  },
  entry: {
    index: ["core-js", path.join(__dirname, "..", "entries/index.js")],
  },
});
